const User=require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
//render the sign up page
module.exports.signup=function(req, res){
    return res.render('user_sign_up', {
        title:'codial | sign up'
    })
}
// render the sign in page
module.exports.signin=function(req, res){
    return res.render('user_sign_in', {
        title:'codial | sign in'
    })
}
// get the sign up data
module.exports.create=function(req, res){
//to-do
if(req.body.password != req.body.confirm_password ){
    return res.redirect('back');
}
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){
    //         console.log("error finding the user");
    //         return ;
    //     }
    //     if(!user){
    //         User.create(req.body, function(err, user){
    //             if(err){
    //                 console.log("error while creating the user");
    //                 return ;
    //             }
    //             return res.redirect('/users/sign-in');
    //         })
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })
    User.findOne({ email: req.body.email })
    .then(user => {
    if (!user) {
    return User.create(req.body)
        .then(newUser => {
        return res.redirect('/users/sign-in');
        })
        .catch(err => {
        console.log("Error while creating the user:", err);
        return res.redirect('back');
        });
    } else {
    return res.redirect('back');
    }
    })
.catch(err => {
    console.log("Error finding the user:", err);
});

}
// get the sign in data
module.exports.createSession=function(req, res){
    //steps to suthenticate
    
    
    // find the user 
    
    
    //handel id user found
    
    //handel if password is not matched
    
    // handel if user not found

    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
        
            if(user.password != req.body.passord){
                return res.redirect('back');
            }
        res.cookie('user_id' , user.id);
        return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.log("error while authentication");
    })
}