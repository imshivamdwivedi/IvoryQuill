const Article = require("../server/modals/article");
const User = require("../server/modals/user");

exports.getAllArticles = (req,res) =>{
    Article.find().exec((err,articles)=>{
       if(err || !articles){
          return res.status(400).json({
                  err:"Bad request"
         });
       }
       return res.json(articles);
    });
};

exports.getAllUsers =(req,res) =>{
   User.find().exec((err,users)=>{
       if(err||req.profile.role!=1 ){
          return res.status(400).json({
               err:"Can Perform The Errors"
          });
       }
       return res.json(users); 
   });
};

exports.getUserInfo = (req,res)=>{
  User.findById({_id:req.profile._id},(err,user)=>{
      if(err){
        return res.status(404).json({
          err:"User Not Found"
        });
      }
      return res.json(user);
  });
};

exports.deleteArticle = (req,res)=>{
  let blog=req.blog;
  blog.remove((err,deletedBlog)=>{
    if(err){
        return res.status(400).json({
         err:"Some Error Ocuured"
        });
    }
    res.json({
        messsage:"Delete Blog!",
        deletedBlog
    });
  });
};


