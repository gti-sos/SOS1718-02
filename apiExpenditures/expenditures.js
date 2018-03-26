
var apiExpenditures = {};

module.exports = apiExpenditures;

apiExpenditures.register = function(app,BASE_API_PATH,BASE_API_PATH_EXPENDITURES,dbEx,initialsExpenditures) {
//Get todos los datos
app.get(BASE_API_PATH_EXPENDITURES, (req, res) => {
    dbEx.find({}, function(err, expenditure) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log("Get de todos los datos");
        console.log(Date() + " - GET /expenditures-per-students");
        res.send(expenditure);
    });
});

//Get for a city or year
app.get(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        dbEx.find({ country: country }, function(err, expenditures) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - GET /expenditures-per-students/" + country);
            res.send(expenditures);
        });
    }
    else {
        dbEx.find({ year: Number(country) }, function(err, expenditures) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log("Get de un año en concreto");
            console.log(Date() + " - GET /expenditures-per-students/" + country);
            res.send(expenditures);
        });
    }
});

//GET by country and year
app.get(BASE_API_PATH_EXPENDITURES + "/:country" + "/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    dbEx.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, expenditures) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log("Get de una ciudad y año");
        console.log(Date() + " - GET /expenditures-per-students/" + country + "/" + year);
        res.send(expenditures);
    });
});

//Delete all
app.delete(BASE_API_PATH_EXPENDITURES, (req, res) => {
    dbEx.remove({}, { multi: true }, function(err, numRemoved) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        res.sendStatus(200);
        console.log(Date() + " - DELETE /expenditures-per-students");
        console.log(numRemoved + " elements removed.");
    });
});

//Delete by country or year
app.delete(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        dbEx.remove({ country: country }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            res.sendStatus(200);
            console.log(Date() + " - DELETE /expenditures-per-students/" + country);
            console.log(numRemoved + " countries removed.");
        });
    }
    else {
        dbEx.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            res.sendStatus(200);
            console.log(Date() + " - DELETE /expenditures-per-students/" + country);
            console.log(numRemoved + " countries removed.");
        });
    }
});

//Delete country and year
app.delete(BASE_API_PATH_EXPENDITURES + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    dbEx.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log(Date() + " - DELETE /expenditures-per-students/" + year);
        console.log(numRemoved + "elements removed.");
    });
    res.sendStatus(200);
});

//POST
app.post(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - POST /expenditures-per-students");
    var expenditure = req.body;

    /*dbEx.insert({  }, function(err, expenditure) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
    });*/

    dbEx.insert(req.body, function(err, newDoc) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log(req.body);
    });

    res.sendStatus(201);
});

//POST country or year
app.post(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - POST /expenditures-per-students" + country);
    res.sendStatus(405);
});

//POST country and year
app.post(BASE_API_PATH_EXPENDITURES + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - POST /expenditures-per-students/" + country + "/" + year);
    res.sendStatus(405);
});

//PUT 
app.put(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - PUT /expenditures-per-students");
    res.sendStatus(405);
});

//PUT country or year
app.put(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - PUT /expenditures-per-students/" + country);
    res.sendStatus(405);
});

//PUT country and year
app.put(BASE_API_PATH_EXPENDITURES + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    var expenditure = req.body;
    if (country != expenditure.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return 1;
    }
    console.log(Date() + " - POST /contacts/" + country + "/" + year);
    dbEx.update({ $and: [{ country: country }, { year: Number(year) }] }, expenditure, (err, numUpdated) => {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});
}