var mongoose = require("mongoose");
var User = require("./user");

var articleSchema = mongoose.Schema({
    auther_id:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
    },
    flag:{
        type:Number,
        default:2,
    },
    body:{
        type: String,
        required:true
    },
    title:{
         type:String,
         required:true
    },
    likes:{
      type:Number,
      default:0,
      
    },
    date:{
        type: Date
    }

},{ timestamps: true });

var Article = mongoose.model("Article", articleSchema);

// Article.create({
//     auther_id:'5eff5152cfa0a50b58e246a4',
//     title:'Love',
//     body:"This is my Love",
// });

module.exports = Article;