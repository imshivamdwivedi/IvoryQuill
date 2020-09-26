var mongoose = require('mongoose');
const crypto = require("crypto");
const {uuid}  = require('uuidv4');

var userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
       type:String,
       required:true,
       unique:true
    },
    phone:{
       type:Number,
       required:true
    },
    articles: {
      type: Array,
      default: null
    },
    encry_password: {
        type: String,
        required: true
    },
    resetLink:{
      data:String,
      default:''
    },
    salt:String,
    role :{
        type:Number,
        default: 0
    }
  },
  { timestamps: true }
);
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuid();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);