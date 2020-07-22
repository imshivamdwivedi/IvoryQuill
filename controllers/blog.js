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

exports.getAllBlogs = (req,res) =>{
     let limit = 10;
     Article.find().limit(limit).exec((err,articles)=>{
       if(err){
           return res.status(400).json({
             err:"Bad Request can Get you all articles"
           });
       }
       return res.json(articles);
     });
};

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
  article.save((err, article) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save your Blog in DB"
      });
    }
    res.json({
      title: article.title,
      body: article.body,
    });
  });
};