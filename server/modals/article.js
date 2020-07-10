var mongoose = require("mongoose");
var User = require("./user");

var articleSchema = mongoose.Schema({
    auther_id:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
    },
    tag:{
        type:String,
        required:true
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

module.exports = mongoose.model("Article", articleSchema);