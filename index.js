var express = require("express");
var cool = require("cool-ascii-faces");
var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello World");
})

app.listen(process.env.PORT);

console.log(cool());