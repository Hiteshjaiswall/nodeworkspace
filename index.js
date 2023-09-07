// Require the necessary modules
const express = require('express');
const app = express();
const port = 8000;
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require('connect-mongo');

// Configure middleware and settings
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieparser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session storage using connect-mongo
app.use(session({
    name: 'codeial',
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0/code_dev',
        autoRemove: 'disable'
    }),    
    // Error handling for MongoDB connection
    // This part was added, but it needs some modifications
    function (err) {
        console.log("error connecting mongodb ");
    }
}));

// Initialize and configure Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use the routes defined in the './routes' file
app.use('/', require('./routes'));

// Start the server and listen on the specified port
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
