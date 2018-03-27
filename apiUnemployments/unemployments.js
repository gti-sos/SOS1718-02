
var unemploymentapi = {};

module.exports = unemploymentapi;

unemploymentapi.register = function(app,BASE_API_PATH,BASE_API_PATH_UNEMPLOYMENTS,dbUn,initialsUnemployments) {

//Unemployments----------------------------------------------------------------------------------------------------------------------->
//GET all DB
app.get(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    dbUn.find({}, function(err, unemployment) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log(Date() + " - GET /unemployments");
        res.send(unemployment);
    });
});

//GET for a city or year
app.get(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        dbUn.find({ country: country }, function(err, unemployments) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - GET /unemployments/" + country);
            res.send(unemployments);
        });
    }
    else {
        dbUn.find({ year: Number(country) }, function(err, unemployments) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            console.log(Date() + " - GET /unemployments/" + country);
            res.send(unemployments);
        });
    }
});

//GET by country and year
app.get(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - GET /unemployments/" + country + "/" + year);

    dbUn.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, unemployments) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log(Date() + " - GET /unemployments/" + country + "/" + year);
        res.send(unemployments);
    });
});

//DELETE all
app.delete(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - DELETE /unemployments");
    dbUn.remove({}, { multi: true }, function(err, numRemoved) {
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
        console.log(Date() + " - DELETE /unemployments");
        console.log(numRemoved + " elements removed.");
    });
    res.sendStatus(200);
});

//DELETE by country or year
app.delete(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;

    if (isNaN(country)) {
        dbUn.remove({ country: country }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            res.sendStatus(200);
            console.log(Date() + " - DELETE /unemployments/" + country);
            console.log(numRemoved + " countries removed.");
        });
    }
    else {
        dbUn.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.log("Something wrong has happened :(");
                res.sendStatus(500);
            }
            res.sendStatus(200);
            console.log(Date() + " - DELETE /unemployments/" + country);
            console.log(numRemoved + " countries removed.");
        });
    }
    res.sendStatus(200);
});

//DELETE by country and year
app.delete(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - DELETE /unemployments/" + country + "/" + year);
    dbUn.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
        if (err)
            res.sendStatus(500);
        res.sendStatus(200);
        console.log(Date() + " - DELETE /unemployments/" + year);
        console.log(numRemoved + "elements removed.");
    });
    res.sendStatus(200);
});

//POST
app.post(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - POST /unemployments");
    var unemployment = req.body;
    dbUn.insert({ unemployment }, function(err, unemployment) {
        if (err) {
            res.sendStatus(500);
        }
    });
    res.sendStatus(201);
});

app.post(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - POST /unemployments/" + country);
    res.sendStatus(405);
});

app.post(BASE_API_PATH_UNEMPLOYMENTS + "/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /unemployments/" + year);
    res.sendStatus(405);
});

app.post(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - POST /unemployments/" + country + "/" + year);
    res.sendStatus(405);
});

//PUT
app.put(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - PUT /unemployments");
    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    console.log(Date() + " - PUT /unemployments/" + country);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - PUT /unemployments/" + year);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    var unemployment = req.body;
    console.log(Date() + " - PUT /unemployments/" + country + "/" + year);
    if (country != unemployment.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return 1;
    }
    dbUn.update({ $and: [{ country: country }, { year: Number(year) }] }, unemployment, (err, numUpdated) => {
        console.log("Updated: " + numUpdated);
        if (err) {
            console.log("Something wrong has happened :(");
            res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});}