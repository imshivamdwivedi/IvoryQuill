const {body,validationResult} = require("express-validator")
const User = require("../server/modals/user");
const monogodb = require("mongoose");
var Article = require("../server/modals/article");

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.json({
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

exports.getMyArticles= async (req,res) =>{
    //  console.log(req.profile._id);
    // console.log(req.auth._id);
    Article.find({
        auther_id : monogodb.Types.ObjectId(req.auth._id)
    }).exec((err, articles) => {
        var Blogs =[];
        if(articles.length===0){
            return res.render('default/msg',{
                message:" No Artile Found, Please write One!"
            });
        }else{
        for(i=0;i<articles.length;i++)
            Blogs.push(articles[i]);
        //  console.log(Blogs);    
            return res.render('default/articles',{
                Blogs:Blogs
            });
        //      console.log(Blogs[0].article.title);
        // console.log(Blogs[0].article.body);
        //  res.json({
        //      Blogs
        //  });     
        // res.send("lol");
        }
    });
};