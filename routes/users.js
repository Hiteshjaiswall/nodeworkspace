const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);

router.get('/sign-up', usersConrtoller.signup);

router.get('/sign-in', usersConrtoller.signin);
module.exports = router;