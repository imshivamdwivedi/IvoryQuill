const {validationResult} = require("express-validator")
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
const User = require("../server/modals/user");
var config = require("../server/config");
var nodemailer = require("nodemailer");


exports.signup = async(req, res) => {
    const errors = validationResult(req);
    const{email,phone} = req.body;
    
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     error: errors.array()[0].msg
    //   });
    // }
    if(await User.findOne({email})){
        res.render('default/msg',{
            message:"User Already Exit , Try Another Mail to Sign Up !"
        });
    }else{
    
  
    const user = new User(req.body);
    console.log(user);
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Not able to save user in DB"
        });
      }
      res.render('default/msg',{
          message:"Account Created Successfully, Now Login !"
        });
    });
    } 
};

exports.signin = (req,res) =>{
  // console.log(req.body);
   const errors = validationResult(req);
   const {email,password} = req.body;
  //  console.log(email);
   if(!errors.isEmpty()){
       return res.status(422).json({
           errors:errors.array()[0].msg
       });
   }

   User.findOne({email},(err,user)=>{
       if(err|| !user){
          return res.status(404).json({
              err:"User Email Does not exist"
          });
       }

       if(!user.authenticate(password)){
           return res.status(401).json({
            err:"Email and Password did not match"
           });
       }
       
       //token creation
       const token = jwt.sign({_id:user._id},config.secretKey);
       // putting token in cookie
       res.cookie("token",token,{expire:new Date()+5000});

       //sending response to front end
       const{_id,name,email,role} =user;
      //  res.status(200).json({token,user:{_id,name,email,role}});
      userProfile = {
        _id,
        name,
        email,
        role
      };
      // console.log(userProfile._id +" " +userProfile.name+" "+userProfile.email+" "+userProfile._id);
       res.redirect('/');
      });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    let userProfile;
    res.redirect('/login');
  };

exports.isSignedIn = expressJwt({
    secret:config.secretKey,
    userProperty:"auth"
});

exports.isAuthenticated = (req,res,next) =>{
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    // console.log(req.profile);
    // console.log(req.auth);
    // console.log(req.profile._id);
    // console.log(req.auth._id);
    if(!checker){
        return res.status(403).json({
            err:"Access Denied"
        });
    }
    next();
};

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role===0){
        return res.staus(403).json({
            error:"Access Denied ! your are not Admin"
        });
    }
    next();
};

