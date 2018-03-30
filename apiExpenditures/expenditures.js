var apiExpenditures = {};

module.exports = apiExpenditures;

apiExpenditures.register = function(app, BASE_API_PATH, BASE_API_PATH_EXPENDITURES, dbEx, initialsExpenditures) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://wirfen:1234567890@ds161148.mlab.com:61148/sos1718-alc-sandbox";

    var bodyParser = require("body-parser");

    app.use(bodyParser.json());

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sos1718-alc-sandbox");
        dbo.createCollection("expenditures", function(err, res) {
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
            var dbo = db.db("sos1718-alc-sandbox");
            if (err) throw err;
            if (array.length == 4 && array[3] == "expenditures") {
                dbo.collection("expenditures").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    db.close();
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                });
            }
            else if (array.length == 5 && array[3] == "secure" && array[4] == "expenditures") {
                var email = req.headers.email;
                var pass = req.headers.pass;
                if (email == "andres" && pass == "andres")
                    dbo.collection("expenditures").find({}).toArray(function(err, result) {
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
                        if (dbo.collection("expenditures").find({})) {
                            dbo.collection("expenditures").insertMany(initialsExpenditures, function(err, res) {
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
                    dbo.collection("expenditures").find({ year: Number(array[4]) }).toArray(function(err, result) {
                        if (err) throw err;
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    });
                }
            }
            else if (array.length == 6) {
                dbo.collection("expenditures").find({ country: array[4], year: Number((array[5])) }).toArray(function(err, result) {
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
        console.log(Date() + " - POST /expenditures");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            if (array[4] != "" && array[5] != "") {
                var dbo = db.db("sos1718-alc-sandbox");
                dbo.collection("expenditures").insertOne(req.body, function(err, res) {
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
    app.delete("*", (req, res) => {
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
                    dbo.collection("expenditures").deleteMany({ year: array[4] }, function(err, obj) {
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
}