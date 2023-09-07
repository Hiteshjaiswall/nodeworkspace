//require express module(it is a frame work use to work on nodejs)
const express = require('express');
//to use app functionality 
const app = express();
//giving port
const port = 8000;
//
const cookieparser=require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');


const db=require('./config/mongoose');
const session=require('express-session');
const passport = require('passport');
const passportLocal=require("./config/passport-local-strategy");

app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieparser());
app.use(expressLayouts);
//extract styles and sscripts from sub pages into the layout
app.set('layout extractStyles', true);
// use express router to render something on the browser since we are using structural folders it woul take use to route folder

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret:"blahsomething", 
    saveUninitialized:false,
    resave:false, 
    cookie: {
        maxAge:(1000 * 60* 100)
    }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));
//once the application is running ir would verify if there any error
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
