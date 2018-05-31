var url = "mongodb://wirfen:1234567890@ds161148.mlab.com:61148/sos1718-alc-sandbox";
var BASE_API = "/api/v2";
var BASE_API_PATH = "/api/v2/expenditures";
var MongoClient = require('mongodb').MongoClient;
var apiExpenditures = {};
module.exports = apiExpenditures;

var initialsExpenditures = [{ "country": "austria", "year": 1998, "primary": 27.8599, "secundary": 27.46764, "tertiery": 49.0146 },
    {
        "country": "austria",
        "year": 1999,
        "primary": 24.94544,
        "secundary": 30,
        "tertiery": 51.81163
    },
    {
        "country": "austria",
        "year": 2000,
        "primary": 23,
        "secundary": 27.82916,
        "tertiery": 43.92245
    },
    {
        "country": "austria",
        "year": 2001,
        "primary": 23.11054,
        "secundary": 27.8599,
        "tertiery": 41.23967
    },
    {
        "country": "austria",
        "year": 2002,
        "primary": 23.51146,
        "secundary": 27.76882,
        "tertiery": 46.3006
    },
    {
        "country": "austria",
        "year": 2003,
        "primary": 23.28574,
        "secundary": 28.71626,
        "tertiery": 45.90786
    },
    {
        "country": "austria",
        "year": 2004,
        "primary": 22.74152,
        "secundary": 27.46764,
        "tertiery": 49.0146
    },
    {
        "country": "austria",
        "year": 2005,
        "primary": 23.44222,
        "secundary": 26.32676,
        "tertiery": 49.98216
    },
    {
        "country": "belgium",
        "year": 1998,
        "primary": 18.35639,
        "secundary": 38.18731,
        "tertiery": 18.35639
    },
    {
        "country": "belgium",
        "year": 1999,
        "primary": 18.35639,
        "secundary": 22.54006,
        "tertiery": 24.34144
    },
    {
        "country": "belgium",
        "year": 2000,
        "primary": 38.18731,
        "secundary": 18.35639,
        "tertiery": 22.54006
    },
    {
        "country": "belgium",
        "year": 2001,
        "primary": 18.16457,
        "secundary": 23.68813,
        "tertiery": 38.18731
    },
    {
        "country": "belgium",
        "year": 2002,
        "primary": 18.35639,
        "secundary": 24.34144,
        "tertiery": 37.2642
    },
    {
        "country": "belgium",
        "year": 2003,
        "primary": 19.69228,
        "secundary": 22.54006,
        "tertiery": 36.19783
    },
    {
        "country": "belgium",
        "year": 2004,
        "primary": 19.73273,
        "secundary": 33.12874,
        "tertiery": 34.73538
    },
    {
        "country": "belgium",
        "year": 2005,
        "primary": 19.83316,
        "secundary": 32.84222,
        "tertiery": 34.572
    },
    {
        "country": "croatia",
        "year": 1998,
        "primary": 23.11054,
        "secundary": 22.54006,
        "tertiery": 19.83316
    },
    {
        "country": "croatia",
        "year": 1999,
        "primary": 19.83316,
        "secundary": 18.35639,
        "tertiery": 35.82432
    },
    {
        "country": "croatia",
        "year": 2000,
        "primary": 18.35639,
        "secundary": 19.83316,
        "tertiery": 42.42285
    }
];

var expenditures = [{
    "country": "austria",
    "year": 1998,
    "primary": 27.8599,
    "secundary": 27.46764,
    "tertiery": 49.0146
}, {
    "country": "austria",
    "year": 1999,
    "primary": 24.94544,
    "secundary": 30,
    "tertiery": 51.81163
}, {
    "country": "austria",
    "year": 2000,
    "primary": 23,
    "secundary": 27.82916,
    "tertiery": 43.92245
}];

apiExpenditures.register = function(app, request, jwt) {
    //JWT Data
    app.post(BASE_API_PATH + '/jwtdatas', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.json({
                    authData,
                    expenditures
                });
            }
        });
    });

    //JWT Token
    app.get(BASE_API_PATH + '/jwttoken', (req, res) => {
        const user = {
            id: 1,
            username: 'andres',
            email: 'wirfen@gmail.com'
        };
        jwt.sign({ user }, 'secretkey', { expiresIn: '28800s' }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        });
    });

    //Formating tokken
    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            req.token = bearerHeader;
            next();
        }
        else {
            res.sendStatus(403);
        }
    }

    // Proxy
    var apiServerHost = 'https://sos1718-03.herokuapp.com';
    app.use("/proxyG03", function(req, res) {
        //api/v1/global-warmings
        var url = apiServerHost + req.url;
        req.pipe(request(url)).pipe(res);
    });
    
    // Proxy JsonVat
    var apiJsonvat = 'https://jsonvat.com';
    app.use("/proxyVat", function(req, res) {
        var url = apiJsonvat + req.url;
        req.pipe(request(url)).pipe(res);
    });
    
    //Proxy Population
    var apiPopulation ='https://restcountries.eu/rest/v2/region/europe';
    app.use("/proxyPopulation",function(req, res) {
        var url = apiPopulation;
        req.pipe(request(url)).pipe(res);
    });

    //urlQuery
    app.get(BASE_API_PATH, (req, res) => {
        console.log("urlQuery Expenditures V2");
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

    //Postman Docs
    app.get(BASE_API_PATH + "/docs", (req, res) => {
        console.log("Postman Docs Expenditures V2");
        res.redirect("https://documenter.getpostman.com/view/3901859/sos1718-02-expenditures/RVu1HAko");
    });

    //loadInitialData
    app.get(BASE_API_PATH + "/loadInitialData", (req, res) => {
        console.log("loadInitialData Expenditures V2");
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

    //GET SECURED
    app.get(BASE_API + "/secure/expenditures", (req, res) => {
        console.log("Get all secured Expenditures V2");
        var myquery = { name: req.headers.name, pass: req.headers.pass };
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("admins").find(myquery).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.send(result[0]);
                }
                else {
                    delete result[0].pass;
                    delete result[0]._id;
                    //console.log(result[0].admin);
                    console.log(result[0]);
                    res.send(result[0]);
                }
                db.close();
            });
        });
    });

    //GET country OR year
    app.get(BASE_API_PATH + "/:obj" + "", (req, res) => {
        console.log("GET country OR year Expenditures V2");
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
                    res.send(null);
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

    //GET country & year
    app.get(BASE_API_PATH + "/:country/:year", (req, res) => {
        console.log("Get country & year Expenditures V2");
        var myquery = { country: req.params.country, year: Number(req.params.year) };
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
                    })[0]);
                }
                db.close();
            });
        });
    });

    //POST Create a document
    app.post(BASE_API_PATH, (req, res) => {
        console.log("Post Expenditures V2");
        var myquery = {
            country: req.body.country,
            year: Number(req.body.year)
        };
        if (req.body.id || !isNaN(req.body.country) || isNaN(req.body.year) || isNaN(req.body.primary) || isNaN(req.body.secundary) || isNaN(req.body.tertiery)) {
            res.sendStatus(400);
            console.log("Bad request");
        }
        else {
            var newValues = {
                country: req.body.country,
                year: Number(req.body.year),
                primary: Number(req.body.primary),
                secundary: Number(req.body.secundary),
                tertiery: Number(req.body.tertiery)
            };
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-alc-sandbox");
                dbo.collection("expenditures").count(myquery, function(err, count) {
                    if (!err && !count) {
                        dbo.collection("expenditures").insertOne(newValues, function(err, result) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            res.sendStatus(201);
                            db.close();
                        });
                    }
                    else {
                        res.sendStatus(409);
                        console.log("Conflict");
                    }
                    db.close();
                });
            });
        }
    });

    //PUT
    app.put(BASE_API_PATH + "/:country/:year", (req, res) => {
        console.log("Put Expenditures V2");
        console.log(req.params);
        console.log(req.body);
        if (req.body._id != undefined || req.body.country != req.params.country || req.body.year != req.params.year || !isNaN(req.body.country) || isNaN(req.body.year) || isNaN(req.body.primary) || isNaN(req.body.secundary) || isNaN(req.body.tertiery)) {
            res.sendStatus(400);
            console.log("Bad request");
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-alc-sandbox");
                var myquery = { country: req.params.country, year: Number(req.params.year) };
                req.body.young = Number(req.body.young);
                req.body.primary = Number(req.body.primary);
                req.body.secundary = Number(req.body.secundary);
                req.body.tertiery = Number(req.body.tertiery);
                var newValues = { $set: req.body };
                dbo.collection("expenditures").count(myquery, function(err, count) {
                    if (!err && count) {
                        dbo.collection("expenditures").updateOne(myquery, newValues, function(err, result) {
                            if (err) throw err;
                            console.log("1 document updated.");
                            res.sendStatus(200);
                            db.close();
                        });
                    }
                    else {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    db.close();
                });
            });
        }
    });

    //DELETE all
    app.delete(BASE_API_PATH, (req, res) => {
        MongoClient.connect(url, function(err, db) {
            console.log("Delete all Expenditures V2");
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("expenditures").count(function(err, count) {
                if (!err && count) {
                    dbo.collection("expenditures").deleteMany(function(err, obj) {
                        if (err) throw err;
                        console.log(count + " registers deleted.");
                        res.send(count + " registers deleted.");
                        db.close();
                    });
                }
                else {
                    console.log("Not found");
                    res.send("Nothing for delete");
                }
                db.close();
            });
        });
    });

    //DELETE country or year
    app.delete(BASE_API_PATH + "/:obj", (req, res) => {
        console.log("Delete country or year Expenditures V2");
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
            dbo.collection("expenditures").count(myquery, function(err, count) {
                if (!err && count) {
                    dbo.collection("expenditures").deleteMany(myquery, function(err, obj) {
                        if (err) throw err;
                        console.log("Ok");
                        res.sendStatus(200);
                        db.close();
                    });
                }
                else {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                db.close();
            });
        });
    });

    //DELETE country & year
    app.delete(BASE_API_PATH + "/:country/:year", (req, res) => {
        console.log("Delete country & year Expenditures V2");
        var myquery = { country: req.params.country, year: Number(req.params.year) };
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-alc-sandbox");
            dbo.collection("expenditures").count(myquery, function(err, count) {
                if (!err && count) {
                    dbo.collection("expenditures").deleteOne(myquery, function(err, obj) {
                        if (err) throw err;
                        console.log("Ok");
                        res.send(myquery.country + " " + myquery.year + " removed.");
                        db.close();
                    });
                }
                else {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                db.close();
            });
        });
    });

    //Methods not allowed
    //GET to BASE_API
    app.get(BASE_API, (req, res) => {
        res.sendStatus(405);
        console.log("Method not allowed");
    });
    //POST with arguments.
    app.post(BASE_API_PATH + "/*", (req, res) => {
        res.sendStatus(405);
        console.log("Method not allowed");
    });
    //PUT without arguments.
    app.put(BASE_API_PATH, (req, res) => {
        res.sendStatus(405);
        console.log("Method not allowed");
    });
    //PUT with 1 argument.
    app.put(BASE_API_PATH + "/:obj", (req, res) => {
        res.sendStatus(405);
        console.log("Method not allowed");
    });
    //PUT with more than 2 arguments.
    app.put(BASE_API_PATH + "/:obj1/:obj2" + "/*", (req, res) => {
        res.sendStatus(405);
        console.log("Method not allowed");
    });
};
