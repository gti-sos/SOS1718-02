var express = require("express");
var app = express();
var BASE_API_PATH_EMPLOYMENTS = "/api/v1/employments-by-status";
var BASE_API_PATH_UNEMPLOYMENTS = "/api/v1/unemployments";
var BASE_API_PATH_EXPENDITURES="/api/v1/expenditures-per-students";

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var employments = [
    {"country": "croatia","year": 1998,"total-self-employed":18.5,"total-salaried-employed":75.30000305,"total-contributing-family-worker":6.19999980926514},
    {"country": "cyprus","year": 2005,"total-self-employed":20.5,"total-salaried-employed":76.80000305,"total-contributing-family-worker":2.799999952},
];
var employments1 = [
    {"country": "romania","year": 1998,"total-self-employed":22.60000038,"total-salaried-employed":59.70000076,"total-contributing-family-worker":17.79999924},
    {"country": "romania","year": 2005,"total-self-employed":21.39999962,"total-salaried-employed":64.69999695,"total-contributing-family-worker":13.80000019}
];

var unemployments = [
];
var unemployments1 = [
];
 
var expenditures = [
];
var expenditures = [
];
 
app.get("/hello",(req,res)=>{
    res.send("Hello World");
});

app.use("/",express.static(__dirname+"/public"));

//expenditures
app.get(BASE_API_PATH_EXPENDITURES , (req, res) => {
    console.log(Date() + " - GET /expenditures-per-students");
    res.send(expenditures);
});

app.post(BASE_API_PATH_EXPENDITURES , (req, res) => {
    console.log(Date() + " - POST /expenditures-per-students");
    var expenditure = req.body;
    expenditures.push(expenditure);
    res.sendStatus(201);
});
app.put(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - PUT /expenditures-per-students");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - DELETE /expenditures-per-students");
    expenditures = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - GET /expenditures-per-students/" + country);

    res.send(expenditures.filter((c) => {
        return (c.country == country);
    })[0]);
});

app.delete(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - DELETE /expenditures-per-students/" + country);

    expenditures = expenditures.filter((c) => {
        return (c.country != country);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - POST /expenditures-per-students/" + country);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    var expenditure = req.body;

    console.log(Date() + " - PUT /expenditures-per-students/" + country);

    if (country != expenditure.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    expenditures = expenditures.map((c) => {
        if (c.country == expenditure.country)
            return expenditure;
        else
            return c;
    });

    res.sendStatus(200);
});


//unemployments
app.get(BASE_API_PATH_UNEMPLOYMENTS , (req, res) => {
    console.log(Date() + " - GET /unemployments");
    res.send(unemployments);
});

app.post(BASE_API_PATH_UNEMPLOYMENTS , (req, res) => {
    console.log(Date() + " - POST /unemployments");
    var unemployment = req.body;
    employments.push(unemployment);
    res.sendStatus(201);
});
app.put(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - PUT /unemployments");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - DELETE /unemployments");
    unemployments = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - GET /unemployments/" + country);

    res.send(unemployments.filter((c) => {
        return (c.country == country);
    })[0]);
});

app.delete(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - DELETE /unemployments/" + country);

    unemployments = unemployments.filter((c) => {
        return (c.country != country);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - POST /unemployments/" + country);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    var unemployment = req.body;

    console.log(Date() + " - PUT /unemployments/" + country);

    if (country != unemployment.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    unemployments = unemployments.map((c) => {
        if (c.country == unemployment.country)
            return unemployment;
        else
            return c;
    });

    res.sendStatus(200);
});


//employments-by-status
app.get(BASE_API_PATH_EMPLOYMENTS , (req, res) => {
    console.log(Date() + " - GET /employments-by-status");
    res.send(employments);
});

app.post(BASE_API_PATH_EMPLOYMENTS , (req, res) => {
    console.log(Date() + " - POST /employments-by-status");
    var employment = req.body;
    employments.push(employment);
    res.sendStatus(201);
});
app.put(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
    console.log(Date() + " - PUT /employments-by-status");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
    console.log(Date() + " - DELETE /employments-by-status");
    employments = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - GET /employments-by-status/" + country);

    res.send(employments.filter((c) => {
        return (c.country == country);
    })[0]);
});

app.delete(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - DELETE /employments-by-status/" + country);

    employments = employments.filter((c) => {
        return (c.country != country);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - POST /employments-by-status/" + country);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    var employment = req.body;

    console.log(Date() + " - PUT /employments-by-status/" + country);

    if (country != employment.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    employments = employments.map((c) => {
        if (c.country == employment.country)
            return employment;
        else
            return c;
    });

    res.sendStatus(200);
});

app.listen(process.env.PORT);