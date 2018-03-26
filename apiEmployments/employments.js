
var employmentapi = {};

module.exports = employmentapi;

employmentapi.register = function(app,BASE_API_PATH,BASE_API_PATH_EMPLOYMENTS,dbEm,initialsEmployments) {

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
        /*if (country != employment.country) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return 1;
        }*/
        dbEm.update({ $and: [{ country: country }, { year: Number(year) }] }, employment, (err, numUpdated) => {
            if (err) {
                res.sendStatus(500);
            }
            console.log("Updated: " + numUpdated);
        });
        res.sendStatus(200);
    });
}
