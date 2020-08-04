const {body,validationResult} = require("express-validator")
const User = require("../server/modals/user");

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
     user = await User.findOne({
         "_id":req.profile._id
     });
     var Blogs =[];
     if(user.articles.length===0){
        return res.render('default/msg',{
            message:" No Artile Found, Please write One!"
        });
     }else{
      for(i=0;i<user.articles.length;i++)
          Blogs.push(user.articles[i]);
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
};