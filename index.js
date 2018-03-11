var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});

app.use("/",express.static("/home/ubuntu/workspace/SOS1718-02"));


app.listen(process.env.PORT);