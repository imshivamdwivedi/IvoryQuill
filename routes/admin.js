var express = require('express');
var router = express.Router();

const{isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");
const{getBlogById} = require("../controllers/blog");
const { getAllArticles, getAllUsers,getUserInfo,deleteArticle } = require('../controllers/admin');

router.param("blogId",getBlogById);
router.param("userId",getUserById);

router.get("/api/admin/userAll",isAdmin,isAuthenticated,isSignedIn, getAllUsers);
router.get("/api/admin/userInfo/:userId",getUserInfo);
router.get("/api/admin/articlesAll",isAdmin,isAuthenticated,isSignedIn,getAllArticles);
router.delete("/api/admin/delete/:blogId",isAdmin,isAuthenticated,isSignedIn,deleteArticle)

module.exports =router;