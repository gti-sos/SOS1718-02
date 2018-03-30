var port = (process.env.PORT || 1607);

var express = require("express");
var app = express();
app.use("/", express.static(__dirname + "/public"));
app.use("/api/v1/miapi/docs", express.static(__dirname + "/public"));

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
        db.close();
    });
});

var initialsExpenditures = [
    { "country": "austria", "year": 1998, "primary": 27.8599, "secundary": 27.46764, "tertiery": 49.0146 },
    { "country": "belgium", "year": 2005, "primary": 19.83316, "secundary": 32.84222, "tertiery": 34.572 },
    { "country": "romania", "year": 1998, "primary": 19.7114, "secundary": 27.59638, "tertiery": 25.89706 },
    { "country": "portugal", "year": 2005, "primary": 22.47196, "secundary": 33.54664, "tertiery": 26.26249 },
    { "country": "croatia", "year": 1998, "primary": 23.11054, "secundary": 22.54006, "tertiery": 19.83316 },
    { "country": "denmark", "year": 2003, "primary": 25.29723, "secundary": 34.75882, "tertiery": 66.72786 },
    { "country": "france", "year": 2004, "primary": 18.42795, "secundary": 30.07212, "tertiery": 35.17949 },
    { "country": "italy", "year": 2001, "primary": 23.71071, "secundary": 30.13383, "tertiery": 24.97742 }
];
//Super GET Unificado
app.get(BASE_API_PATH_EXPENDITURES + "*", (req, res) => {
    var pet = req.url;
    var array = pet.split("/");
    console.log("Entrando en super get");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        if (array.length == 4 && array[3] == "expenditures") {
            dbo.collection("expenditures").find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                res.send(result);
            });
        }
        else if (array.length == 5) {
            if (isNaN(array[4])) {
                if (array[4] == "loadInitialData") {
                    dbo.collection("expenditures").count(function(err, count) {
                        if (!err && count == 0) {
                            dbo.collection("expenditures").insertMany(initialsExpenditures, function(err, res) {
                                if (err) throw err;
                                console.log("Number of documents inserted: " + res.insertedCount);
                                res.sendStatus(200);
                            });
                        }
                        else{
                            console.log("DB already has " + count + " documents inserted.");
                            res.sendStatus(200);
                        }
                    });
                }
                else {
                    dbo.collection("expenditures").find({ country: array[4] }).toArray(function(err, result) {
                        if (err) throw err;
                        res.send(result);
                    });
                }
            }
            else {
                dbo.collection("expenditures").find({ year: Number(array[4]) }).toArray(function(err, result) {
                    if (err) throw err;
                    res.send(result);
                });
            }
        }
        else if (array.length == 6) {
            dbo.collection("expenditures").find({ country: array[4], year: Number((array[5])) }).toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
            });
        }
        else {
            res.sendStatus(400);
        }
        db.close();
    });
});

//POST
app.post(BASE_API_PATH_EXPENDITURES, (req, res) => {
    var pet = req.url;
    var array = pet.split("/");
    console.log(Date() + " - POST /expenditures");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        else if (array[3] == "expenditures" && array[4] != "" && array[5] != "") {
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("expenditures").insertOne(req.body, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
            res.sendStatus(201);
        }
        else {
            res.sendStatus(400);
        }
    });
});

//PUT
app.put(BASE_API_PATH_EXPENDITURES, (req, res) => {
    var pet = req.url;
    var array = pet.split("/");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        var myquery = { $and: [{ country: array[4] }, { year: Number(array[5]) }] };
        var newvalues = { $set: req.body };
        if (array[4] != "" && array[5] != "") {
            dbo.collection("expenditures").updateOne(myquery, newvalues, function(err, result) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
        }
        else {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

//DELETE
app.delete(BASE_API_PATH_EXPENDITURES, (req, res) => {
    var pet = req.url;
    var array = pet.split("/");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        if (err) throw err;
        if (array.length == 4 && array[3] == "expenditures") {
            dbo.collection("expenditures").deleteMany(function(err, obj) {
                if (err) throw err;
                res.sendStatus(200);
            });
        }
        else if (array.length == 6 && array[4] != "" && array[5] != "") {
            dbo.collection("expenditures").deleteOne({ $and: [{ country: array[4] }, { year: Number(array[5]) }] }, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                res.sendStatus(200);
            });
        }
        else if (array.length == 5) {
            if (isNaN(array[4])) {
                dbo.collection("expenditures").deleteMany({ country: array[4] }, function(err, obj) {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            }
            else {
                dbo.collection("expenditures").deleteMany({ year: Number(array[4]) }, function(err, obj) {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            }
        }
        else {
            res.sendStatus(400);
        }
        db.close();
    });
});

//Busquedas raras
app.get(BASE_API_PATH_EXPENDITURES + "/country" + "*", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        var query = req.query;

        if (req.query.year) {
            query.year = Number(req.query.year);
        }

        if (req.query.primary) {
            query.primary = Number(req.query.primary);
        }
        if (req.query.secundary) {
            query.secundary = Number(req.query.secundary);
        }
        if (req.query.tertiery) {
            query.tertiery = Number(req.query.tertiery);
        }

        dbo.collection("expenditures").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.listen(port, () => {
    console.log("Server ready on port: " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");