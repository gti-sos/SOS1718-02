var express = require("express");
var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});

app.use("/",express.static(__dirname+"/public"));

app.listen(process.env.PORT);