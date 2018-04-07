var url = "mongodb://wirfen:1234567890@ds161148.mlab.com:61148/sos1718-alc-sandbox";
var BASE_API = "/api/v1";
var BASE_API_PATH = "/api/v1/expenditures";
var MongoClient = require('mongodb').MongoClient;
var apiExpenditures = {};
module.exports = apiExpenditures;

var initialsExpenditures = [
    { "country": "austria", "year": 1998, "primary": 27.8599, "secundary": 27.46764, "tertiery": 49.0146 },
    { "country": "belgium", "year": 2005, "primary": 19.83316, "secundary": 32.84222, "tertiery": 34.572 },
    { "country": "romania", "year": 1998, "primary": 19.7114, "secundary": 27.59638, "tertiery": 25.89706 },
    { "country": "portugal", "year": 2005, "primary": 22.47196, "secundary": 33.54664, "tertiery": 26.26249 },
    { "country": "croatia", "year": 1998, "primary": 23.11054, "secundary": 22.54006, "tertiery": 19.83316 },
    { "country": "denmark", "year": 2003, "primary": 25.29723, "secundary": 34.75882, "tertiery": 66.72786 },
    { "country": "france", "year": 2004, "primary": 18.42795, "secundary": 30.07212, "tertiery": 35.17949 },
    { "country": "italy", "year": 2001, "primary": 23.71071, "secundary": 30.13383, "tertiery": 24.97742 },
];

apiExpenditures.register = function(app) {
    //urlQuery
    app.get(BASE_API_PATH + "/country?" + "*", (req, res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            var query = req.query;
            var limit = 0;
            var offset = 0;
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
            if (req.query.offset) {
                offset = Number(req.query.offset);
            }
            if (req.query.limit) {
                limit = Number(req.query.limit);
            }
            delete query.offset;
            delete query.limit;
            dbo.collection("expenditures").find(query).skip(offset).limit(limit).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    });

    //GET all
    app.get(BASE_API_PATH, (req, res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            if (err) throw err;
            dbo.collection("expenditures").find({}).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    });

    //Postman docs
    app.get(BASE_API_PATH + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3901859/sos1718-02-expenditures/RVu1HAko");
    });

    //loadInitialData
    app.get(BASE_API_PATH + "/loadInitialData", (req, res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("expenditures").count(function(err, count) {
                if (!err && !count) {
                    dbo.collection("expenditures").insertMany(initialsExpenditures, function(err, resu) {
                        if (err) throw err;
                        console.log("Number of documents inserted: " + resu.insertedCount);
                        res.send("Number of documents inserted: " + resu.insertedCount);
                        db.close();
                    });
                }
                else {
                    console.log("Expenditures has " + count + " documents inserted.");
                    res.send("Expenditures has " + count + " documents inserted.");
                }
                db.close();
            });
        });
    });

    //GET all SECURED
    app.get(BASE_API + "/secure/expenditures", (req, res) => {
        var email = req.headers.email;
        var pass = req.headers.pass;
        if (email == "andreslorenzo" && pass == "andreslorenzo") {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-alc-sandbox");
                dbo.collection("expenditures").find().toArray(function(err, result) {
                    if (!err && !result.length) {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    else {
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                    db.close();
                });
            });
        }
        else {
            console.log("Unauthorized");
            res.sendStatus(401);
        }
    });

    //GET country OR year
    app.get(BASE_API_PATH + "/:obj" + "", (req, res) => {
        var myquery;
        if (isNaN(req.params.obj)) {
            myquery = { country: req.params.obj };
        }
        else {
            myquery = { year: Number(req.params.obj) };
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("expenditures").find(myquery).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    });
};
