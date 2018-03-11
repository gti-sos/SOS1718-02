var express = require("express");
var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello World");
})

app.use("/",express.static("/home/ubuntu/workspace/SOS1718-02/public"));


app.listen(process.env.PORT);