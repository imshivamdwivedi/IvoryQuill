const Article = require('../server/modals/article');
const User = require('../server/modals/user');
exports.getBlogById = (req,res,next,id)=>{
  Article.findById(id).exec((err,blog)=>{
        if(err || !blog){
            return res.status(400).json({
              err:"Blog Not Found"
            });
        }
        req.blog =blog;
        next();
  });
};

// exports.publishedBlog = async(req,res) =>{
//     var data = await Article.find({'auther_id':req.profile._id});
//     var array[];
//      for(int i=0;i<data.length;i++){
           
//      }
// };

// exports.getStatus=(req,res)=>{
//    Article.fin
// };

exports.getBlog=(req,res)=>{
   Article.findById({auther_id:req.profile}).exec((err,articles=>{
    if(err || !blog){
      return res.status(400).json({
        err:"Blog Not Found"
      });
    }else{
      return res.json(articles);
    }
   }));
};

exports.deleteBlog =(req,res) =>{
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

exports.postBlog = (req,res) =>{
  const {title, data} = req.body;
  
  var content = {
    title:title,
    body:data,
    auther_id:req.profile._id
  }
  var article = new Article(content);
  article.save((err, article) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save your Blog in DB"
      });
    }
  User.findByIdAndUpdate(
    req.profile._id,
    {$push: {articles:{article}}},
    {safe: true, upsert: true},
    function(err, articles) {
      if(err)  
         console.log(err);
      console.log(articles);   
    }
  );
  
    console.log(article.title + " " + article.body + req.profile._id);

  });
};