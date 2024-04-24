const express = require('express');
const router = express.Router();
const userController = require('../backend/src/usercontrol');
const bcrypt =require('bcryptjs');
const jwt = require ('jsonwebtoken');
router.post('/user/create', userController.createUserControllerFn);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
module.exports = router;
