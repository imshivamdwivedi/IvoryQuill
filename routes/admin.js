var express = require('express');
var router = express.Router();

const{isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");
const{getBlogById} = require("../controllers/blog");
const {getAllUsers,getUserInfo, getArticleModPage, acceptArticle, rejectArticle} = require('../controllers/admin');

router.param("blogId",getBlogById);
router.param("userId",getUserById);

router.get("/api/admin/userAll",isAdmin,isAuthenticated,isSignedIn, getAllUsers);
router.get("/api/admin/userInfo/:userId",getUserInfo);
router.get('/adminPanel', isSignedIn, isAdmin, getArticleModPage);
router.get('/api/acceptArticle', isSignedIn, isAdmin, acceptArticle);
router.get('/api/rejectArticle', isSignedIn, isAdmin, rejectArticle);

module.exports =router;