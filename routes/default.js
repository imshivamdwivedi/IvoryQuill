var express = require('express');
var jwt_decode = require('jwt-decode');
var router = express.Router();
const User = require('../server/modals/user');
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUser,getUserById,getMyArticles,updateUser} = require("../controllers/user");
const config = require('../server/config');

/* GET home page. */
router.get('/',async(req, res) => {
 let  userProfile;
   if(req.cookies.token){
   var id =(jwt_decode(req.cookies.token));
   var data= await User.findById(id._id);
   userProfile=data;

   }

  res.render('default/index',{
    userProfile:userProfile
  });
});

router.get('/about', (req, res) => {
  
  res.render('default/about');
});
router.get('/login', (req, res) => {
 
  res.render('default/login');
});
router.get('/profile',async(req,res)=>{ 
  let  userProfile;
  if(req.cookies.token){
  var id =jwt_decode(req.cookies.token);
  var data= await User.findById(id._id);
  userProfile=data;
  }
 
    res.render('default/profile',{
      userProfile:userProfile
    });
},isAuthenticated,isSignedIn);


router.get('/write',async(req,res)=>{
  let  userProfile;
  if(req.cookies.token){
  var id =jwt_decode(req.cookies.token);
  var data= await User.findById(id._id);
  userProfile=data;
  }
  res.render('default/write',{
    userProfile:userProfile
  });
},isAuthenticated,isSignedIn);

 router.get('/msg', (req, res) => {
   res.render('default/msg',{
     message:''
   });
});

// router.get('/articles',(req,res)=>{   //others article
//   res.render('')
// })
router.param("userId", getUserById);
router.get('/api/profile/:userId',isSignedIn,isAuthenticated,getUser);  //get profile
router.put('/api/profile/update/:userId',isSignedIn,isAuthenticated,updateUser);  //edit profile
router.get('/api/articles/:userId',isSignedIn,isAuthenticated,getMyArticles,getUserById);  //self publish articles
// router.post(/api/contact-us/user:Id); //conatct us

module.exports = router;
