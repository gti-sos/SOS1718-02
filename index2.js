var port = (process.env.PORT || 1607);

var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://wirfen:1234567890@ds161148.mlab.com:61148/sos1718-alc-sandbox";

var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_EMPLOYMENTS = "/api/v1/employments";
var BASE_API_PATH_UNEMPLOYMENTS = "/api/v1/unemployments";
var BASE_API_PATH_EXPENDITURES = "/api/v1/expenditures";

var bodyParser = require("body-parser");

app.use(bodyParser.json());

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sos1718-alc-sandbox");
    dbo.createCollection("expenditures", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    dbo.createCollection("employments", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    dbo.createCollection("unemployments", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

var initialsEmployments = [
    { "country": "croatia", "year": 1998, "total-self-employed": 18.5, "total-salaried-employed": 75.30000305, "total-contributing-family-worker": 6.19999980926514 },
    { "country": "cyprus", "year": 2005, "total-self-employed": 20.5, "total-salaried-employed": 76.80000305, "total-contributing-family-worker": 2.799999952 },
    { "country": "romania", "year": 1998, "total-self-employed": 22.60000038, "total-salaried-employed": 59.70000076, "total-contributing-family-worker": 17.79999924 },
    { "country": "romania", "year": 2005, "total-self-employed": 21.39999962, "total-salaried-employed": 64.69999695, "total-contributing-family-worker": 13.80000019 }
];

var initialsUnemployments = [
    { "country": "austria", "year": 1998, "young-unemployment": 1.600000024, "adult-unemployment": 1.600000024, "old-unemployment": 1.600000024, "long-term-unemployment": 1.600000024 },
    { "country": "belgium", "year": 2003, "young-unemployment": 3.5, "adult-unemployment": 3.5, "old-unemployment": 3.5, "long-term-unemployment": 3.5 },
    { "country": "bulgaria", "year": 1998, "young-unemployment": 8, "adult-unemployment": 8, "old-unemployment": 8, "long-term-unemployment": 8 },
    { "country": "croatia", "year": 2003, "young-unemployment": 8, "adult-unemployment": 8, "old-unemployment": 8, "long-term-unemployment": 8 }
];

var initialsExpenditures = [
    { "country": "austria", "year": 1998, "primary": 27.8599, "secundary": 27.46764, "tertiery": 49.0146 },
    { "country": "belgium", "year": 2005, "primary": 19.83316, "secundary": 32.84222, "tertiery": 34.572 },
    { "country": "romania", "year": 1998, "primary": 19.7114, "secundary": 27.59638, "tertiery": 25.89706 },
    { "country": "portugal", "year": 2005, "primary": 22.47196, "secundary": 33.54664, "tertiery": 26.26249 }
];

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

//Reload databases
app.get(BASE_API_PATH + "/load", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        dbo.collection("expenditures").deleteMany(function(err, obj) {
            if (err) throw err;
        });
        dbo.collection("employments").deleteMany(function(err, obj) {
            if (err) throw err;
        });
        dbo.collection("unemployments").deleteMany(function(err, obj) {
            if (err) throw err;
        });
        dbo.collection("expenditures").insertMany(initialsExpenditures, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        dbo.collection("employments").insertMany(initialsEmployments, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        dbo.collection("unemployments").insertMany(initialsUnemployments, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        db.close();
        res.sendStatus(418);
    });
});

//GET all
app.get(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - GET /expenditures");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        dbo.collection("expenditures").find({}).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            res.send(result);
        });
    });
});

//GET a city or year
app.get(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - GET /expenditures/" + country);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        if (isNaN(country)) {
            dbo.collection("expenditures").find({ country: country }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        }
        else {
            dbo.collection("expenditures").find({ year: Number(country) }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        }
        db.close();
        //res.send(res) 
    });
});

//GET a city and year
app.get(BASE_API_PATH_EXPENDITURES + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - GET /expenditures/" + country + "/" + year);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        dbo.collection("expenditures").find({ country: country, year: Number(year) }).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            res.send(result);
            db.close();
        });
    });
});

//POST
app.post(BASE_API_PATH_EXPENDITURES, (req, res) => {
    var expenditures = req.body;
    console.log(Date() + " - POST /expenditures");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        dbo.collection("expenditures").insertOne(expenditures, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        res.sendStatus(201);
    });
});

//PUT no funciona
app.put(BASE_API_PATH_EXPENDITURES + "/:country" + "/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        var myquery = {$and: [{ country: country},{ year: Number(year) }]};
        var newvalues = { $set: req.body };
        dbo.collection("expenditures").updateOne(myquery, newvalues, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log("Server ready on port: " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");
