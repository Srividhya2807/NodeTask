var express    = require("express");
var bodyParser = require("body-parser");
var async = require('async');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'userinfo'
});
var app = express();
app.use(require('express-domain-middleware'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/listAllUser",function(req,res){
connection.query('SELECT * from user', function(err, rows, fields) {
connection.end();
  if (!err){
    // console.log('The solution is: ', fields);
    res.json(rows);
  }
  else{
    console.log('Error while performing Query.');
  }
  });
});

app.post("/createNewUser",function(req,res){
  console.log(req.body);
  var post = {
    id : req.body.id,
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    street :  req.body.street,
    city : req.body.city,
    zipcode : req.body.zipcode

  }
connection.query('insert into user set?',post, function(error) {
connection.end();
   if (error) {
           console.log(error.message);
       } else {
           console.log('success');    
       }
   });
   res.send('success');
});

app.post("/updateUser",function(req,res){
  console.log(req.body);
   var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
  var post = {
    //id : req.body.id,
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    street :  req.body.street,
    city : req.body.city,
    zipcode : req.body.zipcode
  }
connection.query('UPDATE user set ? where id=?',[post,id], function(error) {
connection.end();
   if (error) {
           console.log(error.message);
       } else {
           console.log('success');    
       }
   });
   res.send('success');
});

app.post("/deleteUser",function(req,res){
  console.log(req.body);
  var post = {
    id : req.body.id
  }
connection.query('delete from user where id=?',post, function(error) {
connection.end();
   if (error) {
           console.log(error.message);
       } else {
           console.log('success');    
       }
   });
   res.send('success');
});

app.listen(3000);

