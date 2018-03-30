var apiEmployments = {};
module.exports = apiEmployments;

apiEmployments.register = function(app, BASE_API_PATH, BASE_API_PATH_EMPLOYMENTS, dbEm, initialsEmployments) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://dbtest:dbtest0@ds161148.mlab.com:61148/sos1718-jmm-sandbox";

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-jmm-sandbox");
        dbo.createCollection("employments", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });
        db.close();
    });

    //Super GET Unificado
    app.get("*", (req, res) => {
        var pet = req.url;
        var array = pet.split("/");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            if (err) throw err;
            if (array.length == 4 && array[3] == "employments") {
                dbo.collection("employments").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    db.close();
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                });
            }
            else if (array.length == 5 && array[3] == "secure" && array[4] == "employments") {
                var email = req.headers.email;
                var pass = req.headers.pass;
                if (email == "joseangel" && pass == "joseangel")
                    dbo.collection("employments").find({}).toArray(function(err, result) {
                        if (err) throw err;
                        db.close();
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    });
                else {
                    res.send("Inautorizado");

                }
            }
            else if (array.length == 5) {
                if (isNaN(array[4])) {
                    if (array[4] == "loadInitialData") {
                        if (dbo.collection("employments").find({})) {
                            dbo.collection("employments").insertMany(initialsEmployments, function(err, res) {
                                if (err) throw err;
                                console.log("Number of documents inserted: " + res.insertedCount);
                            });
                        }
                        res.sendStatus(200);
                    }
                    else {
                        dbo.collection("expenditures").find({ country: array[4] }).toArray(function(err, result) {
                            if (err) throw err;
                            res.send(result.map((c) => {
                                delete c._id;
                                return c;
                            }));
                        });
                    }
                }
                else {
                    dbo.collection("employments").find({ year: Number(array[4]) }).toArray(function(err, result) {
                        if (err) throw err;
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    });
                }
            }
            else if (array.length == 6) {
                dbo.collection("employments").find({ country: array[4], year: Number((array[5])) }).toArray(function(err, result) {
                    if (err) throw err;
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                });
            }
            else {
                res.sendStatus(400);
            }
            db.close();
        });
    });

    //POST
    app.post("*", (req, res) => {
        var pet = req.url;
        var array = pet.split("/");
        console.log(Date() + " - POST /employments");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            if (array[4] != "" && array[5] != "") {
                var dbo = db.db("sos1718-jmm-sandbox");
                dbo.collection("employments").insertOne(req.body, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    res.sendStatus(201);
                });
            }
            else {
                res.sendStatus(400);
            }
        });
    });

    //PUT
    app.put("*", (req, res) => {
        var pet = req.url;
        var array = pet.split("/");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            var myquery = { $and: [{ country: array[4] }, { year: Number(array[5]) }] };
            var newvalues = { $set: req.body };
            if (array[4] != "" && array[5] != "") {
                dbo.collection("employments").updateOne(myquery, newvalues, function(err, result) {
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
    app.delete("*", (req, res) => {
        var pet = req.url;
        var array = pet.split("/");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            if (err) throw err;
            if (array.length == 4 && array[3] == "employments") {
                dbo.collection("employments").deleteMany(function(err, obj) {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            }
            else if (array.length == 6 && array[4] != "" && array[5] != "") {
                dbo.collection("employments").deleteOne({ $and: [{ country: array[4] }, { year: Number(array[5]) }] }, function(err, obj) {
                    if (err) throw err;
                    console.log("1 document deleted");
                    res.sendStatus(200);
                });
            }
            else if (array.length == 5) {
                if (isNaN(array[4])) {
                    dbo.collection("employments").deleteMany({ country: array[4] }, function(err, obj) {
                        if (err) throw err;
                        res.sendStatus(200);
                    });
                }
                else {
                    dbo.collection("employments").deleteMany({ year: array[4] }, function(err, obj) {
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
    /*
    var bodyParser = require("body-parser");

    app.use(bodyParser.json());
    //DB Employments
    app.get(BASE_API_PATH_EMPLOYMENTS + "/load", (req, res) => {
        dbEm.find({}, (err, employments) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else if (employments.length == 0) {
                dbEm.insert(initialsEmployments);
                console.log("DB initialized with " + initialsEmployments.length + " countries.");
                res.sendStatus(200);
            }
            else {
                console.log("DB initialized with " + employments.length + " countries.");
                res.sendStatus(200);
            }
        });
    });

    //GET all DB
    app.get(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
        dbEm.find({}, function(err, employment) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - GET /employments");
            res.send(employment);
        });
    });

    //GET for a city or year
    app.get(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
        var country = req.params.country;
        if (isNaN(country)) {
            dbEm.find({ country: country }, function(err, employments) {
                if (err) {
                    console.log("Something wrong has happened :(");
                    res.sendStatus(500);
                }
                console.log(Date() + " - GET /unemployments/" + country);
                res.send(employments);
            });
        }
        else {
            dbEm.find({ year: Number(country) }, function(err, employments) {
                if (err) {
                    console.log("Something wrong has happened :(");
                    res.sendStatus(500);
                }
                console.log(Date() + " - GET /employments/" + country);
                res.send(employments);
            });
        }
    });

    //GET by country and year
    app.get(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        console.log(Date() + " - GET /employments/" + country + "/" + year);
        dbEm.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, employments) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - GET /employments/" + country + "/" + year);
            res.send(employments);
        });
    });
    app.get(BASE_API_PATH + "/secure/employments", (req, res) => {
        if (verificacion==true) {
            res.send(verificacion);
        }
        else {
            res.send("Inautorizado")
        }
    });

    //DELETE all
    app.delete(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
        console.log(Date() + " - DELETE /employments");
        dbEm.remove({}, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - DELETE /employments");
            console.log(numRemoved + " elements removed.");
        });
        res.sendStatus(200);
    });

    //DELETE by country or year
    app.delete(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
        var country = req.params.country;
        if (isNaN(country)) {
            dbEm.remove({ country: country }, { multi: true }, function(err, numRemoved) {
                if (err) {
                    console.log("Something wrong has happened :(");
                    res.sendStatus(500);
                }
                res.sendStatus(200);
                console.log(Date() + " - DELETE /employments/" + country);
                console.log(numRemoved + " countries removed.");
            });
        }
        else {
            dbEm.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
                if (err) {
                    console.log("Something wrong has happened :(");
                    res.sendStatus(500);
                }
                res.sendStatus(200);
                console.log(Date() + " - DELETE /employments/" + country);
                console.log(numRemoved + " countries removed.");
            });
        }
        res.sendStatus(200);
    });

    //DELETE by country and year
    app.delete(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        console.log(Date() + " - DELETE /employments/" + country + "/" + year);
        dbEm.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            res.sendStatus(200);
            console.log(Date() + " - DELETE /employments/" + year);
            console.log(numRemoved + "elements removed.");
        });
        res.sendStatus(200);
    });

    //POST

    //Autenticación
    app.post(BASE_API_PATH + "/secure/employments", (req, res) => {
        var email = req.body.email;
        var pass = req.body.pass;

        if (email == "joseangel" && pass == "joseangel") {
            verificacion = true;
        }
        res.sendStatus(200);


    });

    app.post(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
        console.log(Date() + " - POST /employments");
        var employment = req.body;
        dbEm.insert({ employment }, function(err, employment) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
        });
        res.sendStatus(201);
    });

    app.post(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
        var country = req.params.country;
        console.log(Date() + " - POST /employments/" + country);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH_EMPLOYMENTS + "/:year", (req, res) => {
        var year = req.params.year;
        console.log(Date() + " - POST /employments/" + year);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        console.log(Date() + " - POST /employments/" + country + "/" + year);
        res.sendStatus(405);
    });

    //PUT
    app.put(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
        console.log(Date() + " - PUT /employments");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
        var country = req.params.country;
        console.log(Date() + " - PUT /employments/" + country);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH_EMPLOYMENTS + "/:year", (req, res) => {
        var year = req.params.year;
        console.log(Date() + " - PUT /employments/" + year);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var employment = req.body;
        console.log(Date() + " - PUT /employments/" + country + "/" + year);
        if (country != employment.country) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return 1;
        } //
        dbEm.update({ $and: [{ country: country }, { year: Number(year) }] }, employment, (err, numUpdated) => {
            if (err) {
                res.sendStatus(500);
            }
            console.log("Updated: " + numUpdated);
        });
        res.sendStatus(200);
    });


*/
}
