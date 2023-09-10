//     const post=require('../models/post');
//     module.exports.home = function(req, res){
//         // console.log(req.cookies);

//         // post.find({})
//         // .then((posts)=>{
//         //     res.cookie('user_id', 25);
//         //     return res.render('home', {
//         //         title: "Codeial| home",
//         //         posts:posts
//         //     });
//         // })

//         //poplulate user
//         post.find({}).populate('user').exec(function(err, posts){
//             return res.render('home', {
//                         title: "Codeial| home",
//                         posts:posts
//                     });
//         })
    
// }
const post = require('../models/post');


module.exports.home = function (req, res) {
    // Use Promises for the query and population
    post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path:'user'
        }
    })
    .then(function (posts) {
        return res.render('home', {
            title: "Codeial | home",
            posts: posts
        });
    }).catch(function (err) {
        console.error('Error while populating posts:', err);
        return res.status(500).send('Internal Server Error');
    });
};

