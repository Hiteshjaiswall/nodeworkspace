const express = require('express');
const passport=require('passport');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);

router.get('/sign-Up', usersConrtoller.signUp);

router.get('/sign-In', usersConrtoller.signIn);
router.post('/create', usersConrtoller.create);
//use passport as middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'},
) , usersConrtoller.createSession);

module.exports = router;