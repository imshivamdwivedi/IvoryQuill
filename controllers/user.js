const {body,validationResult} = require("express-validator")
const User = require("../server/modals/user");

var Article = require("../server/modals/article");

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(404).json({
              err:"No user Found"
            });
        }
        req.profile=user;
        next();
    });
};

exports.getUser=(req,res)=>{
   return res.json(req.profile);
};

exports.updateUser =(req,res)=>{
   User.findByIdAndUpdate(
       {_id:req.profile._id},
       {$set:req.body},
       {new:true,userFindAndModify:false},
       (err,user)=>{
                if(err){
                    return res.status(401).json({
                      err:"Unauthorized Access "
                    });
                }
            return res.json(user);  
       });
};

exports.getMyArticles= (req,res) =>{
     console.log(req.profile._id);
    Article.findOne({auther_id:req.profile._id}).exec((err,articles)=>{
          if(err){
              return res.status(404).json({
                  err:"No Articles Found "
              });
          }

          return res.json(articles);
    });
};