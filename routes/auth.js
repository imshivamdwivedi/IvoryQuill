var express = require('express');
var router = express.Router();
const {body,validationResult} = require("express-validator");
const {signup,signin,signout,forgetPassword, isSignedIn, isAdmin, getArticleModPage} = require("../controllers/auth");

router.post('/signup',signup);
  
router.post('/signin',  signin);  

router.put('/forget-password',forgetPassword);

router.get('/signout',signout);

module.exports =router;