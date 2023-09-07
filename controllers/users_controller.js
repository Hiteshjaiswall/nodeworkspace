const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
    return  res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}


module.exports.create = function(req, res) {
if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
}

User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
              // User with the same email already exists
            return res.redirect('back');
        } else {
              // Create a new user using Promises
            User.create(req.body)
                .then(newUser => {
                    return res.redirect('/users/sign-in');
                })
                .catch(err => {
                    console.log('Error in creating user while signing up:', err);
                    return res.redirect('back');
                });
        }
    })
    .catch(err => {
        console.log('Error in finding user in signing up:', err);
        return res.redirect('back');
    });
};


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
        }
        return res.redirect('/');
    });
}
