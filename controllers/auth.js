var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
const User = require("../server/modals/user");
var config = require("../server/config");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

exports.signup = async(req, res) => {
   
    const{email,phone,name} = req.body;
    
    if(await User.findOne({email})){
        return res.render('default/msg',{
            message:"User already registerd with this e-mail , try another mail to sign up !"
        });
    } 
        
    if(await User.findOne({phone})){
       return res.render('default/msg',{
            message:"Phone no. alreday registered  , Try Another Phone no. to Sign Up !"
        });
    }
      const user = new User(req.body);
      console.log(user);

      
        // var transporter = nodemailer.createTransport(smtpTransport({
        //     host: 'smtp.gmail.com',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //       user: 'ivoryquillpublishers@gmail.com',
        //       pass: 'Anthology@2020'
        //     }
        //   }));
    
        //   var emailOptions = {
        //     from: 'IvoryQuill Publications <ivoryquillpublishers@gmail.com>',
        //     to: email,
        //     subject: 'Successfully Created Account',
        //     html: '<p>Congratulations on successfully signing up with <a href="#">Ivoryquills</a>, we are pleased to welcome you to the family of literatees and lovers of words. Ivoryquill Publications is the one destination for all your needs. Whether it is anthology publishing, solo publishing, collaboration for short stories, publishing on the internet or in hard copy! We are a team of dedicated writers, editors, graphic designers and team leads who manage together to form a great experience for all of you we hope you enjoy your time at Ivoryquill<b> ' +name+' </b>Thank you</p>'
        //    };
        //   transporter.sendMail(emailOptions, (err, info) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
                user.save((err, user) => {
                    if (err) {
                     return res.render('default/msg',{
                          message:"Some Error Occured please try Again !"
                      });
                    }
                     return res.render('default/msg',{
                         message:"Account Created Successfully, Now Login !"
                      });
                  });
        //     }
        //   });
    
      
    
};

exports.signin = (req,res) =>{

   const {email,password} = req.body;

   User.findOne({email},(err,user)=>{
       if(err|| !user){
       return res.render('default/msg',{
            message:"User email doesn't Exist !"
        });
       }

       if(!user.authenticate(password)){
       return res.render('default/msg',{
            message:"Email and password didn't match !"
        });
       }
       
       //token creation
       const token = jwt.sign({_id:user._id, userMail : user.email},config.secretKey);
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
    userProperty:"auth",
    getToken: (req) => {
        return req.headers.cookie.split('=')[1];
    }
});

exports.isAuthenticated = (req,res,next) =>{    
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        res.render('default/msg',{
            message:"Access Denied !"
        });
    }
    next();
};

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role===0){
        res.render('default/msg',{
            message:"yoou are not Admin, Access Denied !"
        });
    }
    next();
};

exports.forgetPassword = (req,res)=>{
    
    const {email} = req.body;

    User.findOne({email},(err,user)=>{
        if(err|| !user){
          return res.render('default/msg',{
             message:"User email doesn't Exist !"
          });
        } 

        const token = jwt.sign({_id:user._id},config.resetPasswordKey,{expire:new Date()+1000});
    });    
};
