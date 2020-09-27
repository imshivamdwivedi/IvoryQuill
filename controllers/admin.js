const Article = require("../server/modals/article");
const User = require("../server/modals/user");
const url = require("url");
const mongo = require("mongoose");

exports.getAllUsers = (req,res) =>{
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

exports.getArticleModPage = (req, res) => {
  Article.find({}).exec( (err, articles) => {
    var Blogs =[];
        if(articles.length===0){
            return res.render('default/msg',{
                message:" No Artile Found, Please write One!"
            });
        }else{
        for(i=0;i<articles.length;i++)
            Blogs.push(articles[i]);
            return res.render('default/articlesMod',{
                Blogs:Blogs
            });
        }
  });
};

exports.acceptArticle = (req, res) => {
  const articleId = url.parse(req.url, true).query.id;
  Article.updateOne({
    _id : mongo.Types.ObjectId(articleId)
  }, 
  {
    $set : {
      flag : 1
    }
  }).exec( (err, result) => {
    if (!err) {
      res.redirect('/mod/adminPanel');
    }
  });
};

exports.rejectArticle = (req, res) => {
  const articleId = url.parse(req.url, true).query.id;
  Article.updateOne({
    _id : mongo.Types.ObjectId(articleId)
  }, 
  {
    $set : {
      flag : 0
    }
  }).exec( (err, result) => {
    if (!err) {
      res.redirect('/mod/adminPanel');
    }
  });
};