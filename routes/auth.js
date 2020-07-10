var express = require('express');
var router = express.Router();
const {body,validationResult} = require("express-validator");
const {signup,signin,signout} = require("../controllers/auth");

router.post('/signup',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
  ], signup);
  
  router.post('/signin', [
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
  ], signin);  

router.get('/signout',signout);
 module.exports =router;