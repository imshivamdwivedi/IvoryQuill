var express = require('express');
var router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const{getUserById} = require('../controllers/user');
const{getBlogById,getAllBlogs,getBlog,deleteBlog,postBlog} = require('../controllers/blog');

router.param("blogId",getBlogById);

//read routes
router.get('/api/allBlogs',getAllBlogs);
router.get('/api/blog/:blogId/:userId',isSignedIn,isAuthenticated,getBlog,getUserById,getBlogById);
//Write artcle
router.post('/api/write/blog/:userId',isSignedIn,isAuthenticated,postBlog,getBlogById);

router.delete('/api/delete/blog/:blogId/:userId', isSignedIn,isAuthenticated,isAdmin,deleteBlog,getBlogById,getUserById);


module.exports =router;