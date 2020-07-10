var express = require('express');
var router = express.Router();
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUser,getUserById,getMyArticles,updateUser} = require("../controllers/user");
/* GET home page. */
router.get('/', function(req, res,) {
  res.render('default/index');
});

router.get('/about', (req, res) => {
  res.render('default/about');
});
router.get('/login', (req, res) => {
  res.render('default/login');
});

// router.get('/articles',(req,res)=>{   //others article
//   res.render('')
// })
router.param("userId", getUserById);
router.get('/api/profile/:userId',isSignedIn,isAuthenticated,getUser);  //get profile
router.put('/api/profile/update/:userId',isSignedIn,isAuthenticated,updateUser);  //edit profile
router.get('/api/articles/:userId',isSignedIn,isAuthenticated,getMyArticles);  //self publish articles
// router.post(/api/contact-us/user:Id); //conatct us

module.exports = router;
