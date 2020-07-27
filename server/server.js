const express = require('express');
var config = require('./config');
var bodyParser = require('body-parser')
var flash = require('req-flash');
const path = require('path');
const cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
//route in use
const mainRoute = require('../routes/default');
const authRoute = require('../routes/auth.js');
const blogRoute = require('../routes/blog.js');



//DB Connection
mongoose
  .connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });


// app created
var app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cookieSession());

// app.use(function(req, res, next){
//   res.locals.username = req.locals.username;
//   next();
// }); 

app.use('/', mainRoute);
app.use('/api',authRoute);
app.use('/api/blog',blogRoute);


const port = process.env.PORT ||3000;
app.listen(port, () => {
    console.log('Server connected with port : ' + port);
});