var url = "mongodb://dbtest:dbtest0@ds161148.mlab.com:61148/sos1718-jmm-sandbox";
var BASE_API = "/api/v2";
var BASE_API_PATH = "/api/v2/employments";
var MongoClient = require('mongodb').MongoClient;
var apiEmployments = {};
module.exports = apiEmployments;
var jwt = require('jsonwebtoken');

var initialsEmployments = [
    { "country": "croatia", "year": 1998, "totalself": 18.5, "totalsalaried": 75.30000305, "totalcontributingfamilyworker": 6.19999980926514 },
    { "country": "cyprus", "year": 2005, "totalself": 20.5, "totalsalaried": 76.80000305, "totalcontributingfamilyworker": 2.799999952 },
    { "country": "romania", "year": 1998, "totalself": 22.60000038, "totalsalaried": 59.70000076, "totalcontributingfamilyworker": 17.79999924 },
    { "country": "spain", "year": 2005, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "portugal", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "italy", "year": 2000, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "austria", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "france", "year": 2000, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },


    { "country": "croatia", "year": 1999, "totalself": 18.5, "totalsalaried": 75.30000305, "totalcontributingfamilyworker": 6.19999980926514 },
    { "country": "cyprus", "year": 2004, "totalself": 20.5, "totalsalaried": 76.80000305, "totalcontributingfamilyworker": 2.799999952 },
    { "country": "romania", "year": 1999, "totalself": 22.60000038, "totalsalaried": 59.70000076, "totalcontributingfamilyworker": 17.79999924 },
    { "country": "spain", "year": 2004, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "portugal", "year": 2002, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "italy", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "austria", "year": 2002, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "france", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },


    { "country": "croatia", "year": 2000, "totalself": 18.5, "totalsalaried": 75.30000305, "totalcontributingfamilyworker": 6.19999980926514 },
    { "country": "cyprus", "year": 2003, "totalself": 20.5, "totalsalaried": 76.80000305, "totalcontributingfamilyworker": 2.799999952 },
    { "country": "romania", "year": 2000, "totalself": 22.60000038, "totalsalaried": 59.70000076, "totalcontributingfamilyworker": 17.79999924 },
    { "country": "spain", "year": 2003, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "portugal", "year": 2002, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "italy", "year": 2002, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "austria", "year": 2003, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "france", "year": 2002, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },

    , { "country": "romania", "year": 2001, "totalself": 22.60000038, "totalsalaried": 59.70000076, "totalcontributingfamilyworker": 17.79999924 },
    { "country": "spain", "year": 2004, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "portugal", "year": 2003, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "italy", "year": 2003, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "austria", "year": 2004, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "france", "year": 2003, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 }

];
var datosPrivados = [
    { "country": "croatia", "year": 1998, "totalself": 18.5, "totalsalaried": 75.30000305, "totalcontributingfamilyworker": 6.19999980926514 },
    { "country": "cyprus", "year": 2005, "totalself": 20.5, "totalsalaried": 76.80000305, "totalcontributingfamilyworker": 2.799999952 },
    { "country": "romania", "year": 1998, "totalself": 22.60000038, "totalsalaried": 59.70000076, "totalcontributingfamilyworker": 17.79999924 },
    { "country": "spain", "year": 2005, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "portugal", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "italy", "year": 2000, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "austria", "year": 2001, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 },
    { "country": "france", "year": 2000, "totalself": 21.39999962, "totalsalaried": 64.69999695, "totalcontributingfamilyworker": 13.80000019 }
];
apiEmployments.register = function(app, request) {

    ////////////
    ////JWT/////
    ////////////
    app.post(BASE_API_PATH+'/jwtdatos', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.json({
                    authData,
                    datosPrivados
                    
                });
            }
        });
    });

    app.get(BASE_API_PATH+'/jwttoken', (req, res) => {
        // Mock user
        const user = {
            id: 1,
            username: 'joseangel',
            email: 'joseangel@gmail.com'
        };

        jwt.sign({ user }, 'secretkey', { expiresIn: '30000s' }, (err, token) => {
            if(err) throw err;
            res.json({
                token
            });
        });
    });

    // FORMAT OF TOKEN

    // Verify Token
    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            
            // Set the token
            req.token = bearerHeader;
            // Next middleware
            next();
        }
        else {
            // Forbidden
            res.sendStatus(403);
        }

    }
    ////////////////////////////////////////////////////////////////////////////////
    
    //Colocación de proxys
    app.use("/proxyJA", function(req, res) {
        var dirProxyJA = "https://sos1718-08.herokuapp.com";
        var url = dirProxyJA + req.url;
        req.pipe(request(url)).pipe(res);
    });

    //Postman Docs
    app.get(BASE_API_PATH + "/docs", (req, res) => {
        console.log("Postman Docs employments v2");
        res.redirect("https://documenter.getpostman.com/view/3881259/sos1718-02-employments/RVu5i8A3");
    });

    //loadInitialData
    app.get(BASE_API_PATH + "/loadInitialData", (req, res) => {
        console.log("loadInitialData employments v2");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").count(function(err, count) {
                if (!err && !count) {
                    dbo.collection("employments").insertMany(initialsEmployments, function(err, resu) {
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

    //urlQuery
    app.get(BASE_API_PATH, (req, res) => {
        console.log("urlQuery employments v2");
        console.log(req.query);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            var query = req.query;
            var limit = 0;
            var offset = 0;
            if (req.query.year) {
                query.year = Number(req.query.year);
            }
            if (req.query.totalself) {
                query.totalself = Number(req.query.totalself);
            }
            if (req.query.totalsalaried) {
                query.totalsalaried = Number(req.query.totalsalaried);
            }
            if (req.query.totalcontributingfamilyworker) {
                query.totalcontributingfamilyworker = Number(req.query.totalcontributingfamilyworker);
            }
            if (req.query.offset) {
                offset = Number(req.query.offset);
            }
            if (req.query.limit) {
                limit = Number(req.query.limit);
            }
            delete query.offset;
            delete query.limit;
            dbo.collection("employments").find(query).skip(offset).limit(limit).toArray(function(err, result) {
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

    //GET all SECURED
    app.get(BASE_API + "/secure/employments", (req, res) => {
        console.log("Get all secured employments v2");
        var user = req.headers.user;
        var pass = req.headers.pass;
        if (user == "joseangel" && pass == "joseangel") {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmm-sandbox");
                dbo.collection("employments").find().toArray(function(err, result) {
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
        console.log("GET country OR year employments v2");
        var myquery;
        if (isNaN(req.params.obj)) {
            myquery = { country: req.params.obj };
        }
        else {
            myquery = { year: Number(req.params.obj) };
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").find(myquery).toArray(function(err, result) {
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
        console.log("Get country & year employments v2");
        var myquery = { country: req.params.country, year: Number(req.params.year) };
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").find(myquery).toArray(function(err, result) {
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
        console.log("Post employments v2");
        var myquery = {
            country: req.body.country,
            year: Number(req.body.year)
        };
        if (req.body.id || !isNaN(req.body.country) || isNaN(req.body.year) || isNaN(req.body.totalself) || isNaN(req.body.totalsalaried) || isNaN(req.body.totalcontributingfamilyworker)) {
            res.sendStatus(400);
            console.log("Bad request");
        }
        else {
            var newValues = {
                country: req.body.country,
                year: Number(req.body.year),
                totalself: Number(req.body.totalself),
                totalsalaried: Number(req.body.totalsalaried),
                totalcontributingfamilyworker: Number(req.body.totalcontributingfamilyworker)
            };
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmm-sandbox");
                dbo.collection("employments").count(myquery, function(err, count) {
                    if (!err && !count) {
                        dbo.collection("employments").insertOne(newValues, function(err, result) {
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
        console.log("Put employments v2");
        console.log(req.params);
        console.log(req.body);
        if (req.body._id != undefined || req.body.country != req.params.country || req.body.year != req.params.year || !isNaN(req.body.country) || isNaN(req.body.year) || isNaN(req.body.totalself) || isNaN(req.body.totalsalaried) || isNaN(req.body.totalcontributingfamilyworker)) {
            res.sendStatus(400);
            console.log("Bad request");
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmm-sandbox");
                var myquery = { country: req.params.country, year: Number(req.params.year) };
                var newValues = {
                    $set: {
                        country: req.body.country,
                        year: Number(req.body.year),
                        totalself: Number(req.body.totalself),
                        totalsalaried: Number(req.body.totalsalaried),
                        totalcontributingfamilyworker: Number(req.body.totalcontributingfamilyworker)
                    }
                };
                dbo.collection("employments").count(myquery, function(err, count) {
                    if (!err && count) {
                        dbo.collection("employments").updateOne(myquery, newValues, function(err, result) {
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
            console.log("Delete all employments v2");
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").count(function(err, count) {
                if (!err && count) {
                    dbo.collection("employments").deleteMany(function(err, obj) {
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
        console.log("Delete country or year employments v2");
        var myquery;
        if (isNaN(req.params.obj)) {
            myquery = { country: req.params.obj };
        }
        else {
            myquery = { year: Number(req.params.obj) };
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").count(myquery, function(err, count) {
                if (!err && count) {
                    dbo.collection("employments").deleteMany(myquery, function(err, obj) {
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
        console.log("Delete country & year employments v2");
        var myquery = { country: req.params.country, year: Number(req.params.year) };
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmm-sandbox");
            dbo.collection("employments").count(myquery, function(err, count) {
                if (!err && count) {
                    dbo.collection("employments").deleteOne(myquery, function(err, obj) {
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
