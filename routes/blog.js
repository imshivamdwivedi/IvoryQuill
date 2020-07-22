var express = require('express');
var router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const{getUserById} = require('../controllers/user');
const{getBlogById,getAllBlogs,getBlog,deleteBlog,postBlog} = require('../controllers/blog');

router.param("blogId",getBlogById);
router.param("userId",getUserById);
//read routes
router.get('/allBlogs',isAdmin,getAllBlogs);
router.get('/:blogId/:userId',isSignedIn,isAuthenticated,getBlog);
//Write artcle
router.post('/write/:userId',isSignedIn,isAuthenticated,postBlog);

router.delete('/delete/:blogId/:userId', isSignedIn,isAuthenticated,isAdmin,deleteBlog);


module.exports =router;