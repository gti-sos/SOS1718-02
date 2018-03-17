var express = require("express");
var app = express();
var BASE_API_PATH = "/api/v1";


var employments = [
    {"country": "croatia","year": 1998,"total-self-employed":18.5,"total-salaried-employed":75.30000305,"total-contributing-family-worker":6.19999980926514},
    {"country": "cyprus","year": 2005,"total-self-employed":20.5,"total-salaried-employed":76.80000305,"total-contributing-family-worker":2.799999952},
    {"country": "spain","year": 2003,"total-self-employed":16.60000038,"total-salaried-employed":81.90000153,"total-contributing-family-worker":1.600000024}
];
var employments1 = [
    {"country": "romania","year": 1998,"total-self-employed":22.60000038,"total-salaried-employed":59.70000076,"total-contributing-family-worker":17.79999924},
    {"country": "romania","year": 2005,"total-self-employed":21.39999962,"total-salaried-employed":64.69999695,"total-contributing-family-worker":13.80000019}
];

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});

app.use("/",express.static(__dirname+"/public"));

app.get(BASE_API_PATH + "/employments-by-status", (req, res) => {
    console.log(Date() + " - GET /employments-by-status");
    res.send(employments);
});

app.post(BASE_API_PATH + "/employments-by-status", (req, res) => {
    console.log(Date() + " - POST /employments-by-status");
    var employment = req.body;
    employments.push(employment);
    res.sendStatus(201);
});
app.put(BASE_API_PATH + "/employments-by-status", (req, res) => {
    console.log(Date() + " - PUT /employments-by-status");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/employments-by-status", (req, res) => {
    console.log(Date() + " - DELETE /employments-by-status");
    employments = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/contacts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - GET /contacts/" + name);

    res.send(employments.filter((c) => {
        return (c.name == name);
    })[0]);
});

app.delete(BASE_API_PATH + "/contacts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - DELETE /employments-by-status/" + name);

    employments = employments.filter((c) => {
        return (c.name != name);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/contacts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /employments-by-status/" + name);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/contacts/:name", (req, res) => {
    var name = req.params.name;
    var employment = req.body;

    console.log(Date() + " - PUT /employments-by-status/" + name);

    if (name != employment.name) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    employments = employments.map((c) => {
        if (c.name == employment.name)
            return employment;
        else
            return c;
    });

    res.sendStatus(200);
});

app.get(BASE_API_PATH + "/employments-by-status/loadInitialData", (req, res) => {
    console.log(Date() + " - GET(loadInitialData) /employments-by-status");
    if(employments.length==0){
       employments.push(employments1);    
    }
    res.send(employments);
});

app.listen(process.env.PORT);