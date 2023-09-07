const passport=require("passport");

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user')
//authenticatio using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    //find a user and estabilsh the identity
    // User.findOne({email:email},function(err, user){
    //     if(err){
    //         cosnole.log("error in finding user-->> passport");
    //     return done(err);
    //     }
    // if(!user || user.password!=password){
    //     console.log('invalid username/ password');
    //     return done(null, false );
    // }
    // return done(null , user);
    // } )
    User.findOne({ email: email })
    .then(user => {
        if (!user || user.password !== password) {
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    })
    .catch(err => {
        console.log('Error in finding user-->> passport');
        return done(err);
    });
}
));

// serialzing th euser to decide which key is to be kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserialised the user from the key in thte cookies

passport.deserializeUser(function(id, done){
    // User.findById(id, function(err, user){
    //     if(err){
    //         console.log("error in finding user-->> passport");
    //         return done(err);
    //     }
    // return done(null, user);
    // })
    User.findById(id)
  .then(user => {
    if (!user) {
      console.log("User not found");
      return done(null, false); // Indicates failure, user not found
    }
    // User found, return the user object
    return done(null, user);
  })
  .catch(err => {
    console.error("Error in finding user:", err);
    return done(err);
  });

});

module.exports=passport;