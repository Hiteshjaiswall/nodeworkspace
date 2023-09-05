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
}
// get the sign in data
module.exports.createSession=function(req, res){
    //to-do
    }