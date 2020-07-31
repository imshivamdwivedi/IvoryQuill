const Article = require('../server/modals/article');

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
  return res.json(req.blog);
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
  const article = new Article(req.body);
  console.log(req.body);
  // article.save((err, article) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).json({
  //       err: "Not able to save your Blog in DB"
  //     });
  //   }
  //   res.json({
  //     title: article.title,
  //     body: article.body,
  //   });
  // });
};