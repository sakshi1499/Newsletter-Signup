//jshint esversion:6
const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const request= require("request");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  var firstn = req.body.firstn;
  var lastn = req.body.lastn;
  var email = req.body.email;

var data = {
  members: [
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstn,
        LNAME: lastn
      }
      }
  ]
};
var jsonData= JSON.stringify(data);

var options={
  url : "https://us20.api.mailchimp.com/3.0/lists/2d56166b65",
  method: "POST",
  headers:{
    "Authorization": "sakshimunjal dbb3affa47281e7c35b94e8236280f11-us20"
  },
  body: jsonData
};

request(options,function(error,response,body){
  if(error)
  {
    res.sendFile(__dirname + "/failure.html");
  }
  else{
    if(response.statusCode===200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
  }
});
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port");
});
