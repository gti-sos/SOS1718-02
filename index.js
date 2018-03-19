var port = (process.env.PORT || 1607);
var express = require("express");
var app = express();
var DataStore = require("nedb");

var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_EMPLOYMENTS = "/api/v1/employments-by-status";
var BASE_API_PATH_UNEMPLOYMENTS = "/api/v1/unemployments";
var BASE_API_PATH_EXPENDITURES = "/api/v1/expenditures-per-students";

var dbEmployments = __dirname + "/employments-by-status.db";
var dbUnemployments = __dirname + "/unemployments.db";
var dbExpenditures = __dirname + "/expenditures-per-students.db";

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var initialsEmployments = [
    { "country": "croatia", "year": 1998, "total-self-employed": 18.5, "total-salaried-employed": 75.30000305, "total-contributing-family-worker": 6.19999980926514 },
    { "country": "cyprus", "year": 2005, "total-self-employed": 20.5, "total-salaried-employed": 76.80000305, "total-contributing-family-worker": 2.799999952 },
    { "country": "romania", "year": 1998, "total-self-employed": 22.60000038, "total-salaried-employed": 59.70000076, "total-contributing-family-worker": 17.79999924 },
    { "country": "romania", "year": 2005, "total-self-employed": 21.39999962, "total-salaried-employed": 64.69999695, "total-contributing-family-worker": 13.80000019 }
];

var initialsEmploymentsCopy = [
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

var initialsUnemploymentsCopy = [
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

var initialsExpendituresCopy = [
    { "country": "austria", "year": 1998, "primary": 27.8599, "secundary": 27.46764, "tertiery": 49.0146 },
    { "country": "belgium", "year": 2005, "primary": 19.83316, "secundary": 32.84222, "tertiery": 34.572 },
    { "country": "romania", "year": 1998, "primary": 19.7114, "secundary": 27.59638, "tertiery": 25.89706 },
    { "country": "portugal", "year": 2005, "primary": 22.47196, "secundary": 33.54664, "tertiery": 26.26249 }
];

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.use("/", express.static(__dirname + "/public"));

//Expenditures
var dbEx = new DataStore({
    filename: dbExpenditures,
    autoload: true
});

//Employments
var dbEm = new DataStore({
    filename: dbEmployments,
    autoload: true
})

//Unemployments
var dbUn = new DataStore({
    filename: dbUnemployments,
    autoload: true
})

//DB Expenditures
app.get(BASE_API_PATH_EXPENDITURES + "/loadInitialData", (req, res) => {
    dbEx.find({}, (err, expenditures) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }
        else if (expenditures.length == 0) {
            dbEx.insert(initialsExpendituresCopy);
            initialsExpenditures.push(initialsExpendituresCopy)
            console.log("DB initialized with " + initialsExpenditures.length + " countries.")
            res.sendStatus(200)
        }
        else {
            console.log("DB initialized with " + expenditures.length + " countries.")
            res.sendStatus(200);
        }
    });
});

//DB Employments
app.get(BASE_API_PATH_EMPLOYMENTS + "/loadInitialData", (req, res) => {
    dbEm.find({}, (err, employments) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }
        else if (initialsEmployments.length == 0) {
            dbEm.insert(initialsEmploymentsCopy);
            initialsEmployments.push(initialsEmploymentsCopy)
            console.log("DB initialized with " + initialsEmployments.length + " countries.")
            res.sendStatus(200)
        }
        else {
            console.log("DB initialized with " + employments.length + " countries.")
            res.sendStatus(200);
        }
    });
});

//DB unemployments
app.get(BASE_API_PATH_UNEMPLOYMENTS + "/loadInitialData", (req, res) => {
    dbUn.find({}, (err, unemployments) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }
        else if (initialsUnemployments.length == 0) {
            dbUn.insert(initialsUnemploymentsCopy);
            initialsUnemployments.push(initialsUnemploymentsCopy);
            console.log("DB initialized with " + initialsUnemployments.length + " countries.")
            res.sendStatus(200)
        }
        else {
            console.log("DB initialized with " + unemployments.length + " countries.")
            res.sendStatus(200);
        }
    });
});

//EXPENDITURES------------------------------------------------------------------------------------------------------------------------>
//Get todos los datos
app.get(BASE_API_PATH_EXPENDITURES, (req, res) => {
    dbEx.find({}, function(err, expenditure) {
        console.log("Get de todos los datos")
        console.log(Date() + " - GET /expenditures-per-students");
        res.send(initialsExpenditures)
        //res.send(expenditure)
    });
});

//Get for a city or year
app.get(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        res.send(initialsExpenditures.filter((c) => {
            return (c.country == country);
        }));

        /*dbEx.find({ country: country }, function(err, expenditures) {
            if (err)
                res.send(500)
            console.log(Date() + " - GET /expenditures-per-students/" + country);
            res.send(expenditures)
        });*/
    }
    else {
        res.send(initialsExpenditures.filter((c) => {
            return (c.year == Number(country));
        }));

        /*dbEx.find({ year: Number(country) }, function(err, expenditures) {
            if (err)
                res.send(500)
            console.log("Get de un año en concreto")
            console.log(Date() + " - GET /expenditures-per-students/" + country);
            res.send(expenditures)
        });*/
    }
});

//GET by country and year
app.get(BASE_API_PATH_EXPENDITURES + "/:country" + "/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;

    res.send(initialsExpenditures.filter((c) => {
        return (c.country == country);
    }).filter((c) => {
        return (c.year == year);
    }));

    /*dbEx.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, expenditures) {
        if (err)
            res.send(500)
        console.log("Get de una ciudad y año")
        console.log(Date() + " - GET /expenditures-per-students/" + country + "/" + year);
        res.send(expenditures)
    });*/
});

//Delete all
app.delete(BASE_API_PATH_EXPENDITURES, (req, res) => {
    initialsExpenditures = [];

    dbEx.remove({}, { multi: true }, function(err, numRemoved) {
        if (err)
            res.send(500)
        res.sendStatus(200);
        console.log(Date() + " - DELETE /expenditures-per-students");
        console.log(numRemoved + " elements removed.")
    });
});

//Delete by country or year
app.delete(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        initialsExpenditures = initialsExpenditures.filter((c) => {
            return (c.country != country);
        });

        dbEx.remove({ country: country }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /expenditures-per-students/" + country);
            console.log(numRemoved + " countries removed.")
        });
    }
    else {
        initialsExpenditures = initialsExpenditures.filter((c) => {
            return (c.year != Number(country));
        });

        dbEx.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /expenditures-per-students/" + country);
            console.log(numRemoved + " countries removed.")
        });
    }
});

//Delete country and year
app.delete(BASE_API_PATH_EXPENDITURES + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;

    initialsExpenditures = initialsExpenditures.filter((c) => {
        return (c.country != country && c.year != year);
    });

    dbEx.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
        if (err)
            res.sendStatus(500)
        console.log(Date() + " - DELETE /expenditures-per-students/" + year);
        console.log(numRemoved + "elements removed.")
    });
    res.sendStatus(200);
});

//POST
app.post(BASE_API_PATH_EXPENDITURES, (req, res) => {
    console.log(Date() + " - POST /expenditures-per-students");
    var expenditure = req.body;

    initialsExpenditures.push(expenditure);

    dbEx.insert({ expenditure }, function(err) {
        if (err)
            res.sendStatus(500)
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
    var expenditure = req.body;
    console.log(Date() + " - PUT /expenditures-per-students");
    res.sendStatus(405);
});

//PUT country or year
app.put(BASE_API_PATH_EXPENDITURES + "/:country", (req, res) => {
    var country = req.params.country;
    var expenditure = req.body;
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

    initialsExpenditures = initialsExpenditures.map((c) => {
        if (c.country == expenditure.country && c.year == expenditure.year)
            return expenditure;
        else
            return c;
    });

    dbEx.update({ $and: [{ country: country }, { year: Number(year) }] }, expenditure, (err, numUpdated) => {
        console.log("Updated: " + numUpdated);
    });

    res.sendStatus(200);
});

//Unemployments----------------------------------------------------------------------------------------------------------------------->
//GET all DB
app.get(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    dbUn.find({}, function(err, unemployment) {
        console.log(Date() + " - GET /unemployments");
        res.send(initialsUnemployments);
        //res.send(unemployment)
    });
});

//GET for a city or year
app.get(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        res.send(initialsUnemployments.filter((c) => {
            return (c.country == country);
        }));

        /*dbUn.find({ country: country }, function(err, unemployments) {
            if (err)
                res.send(500)
            console.log(Date() + " - GET /unemployments/" + country);
            res.send(unemployments)
        });*/
    }
    else {
        res.send(initialsUnemployments.filter((c) => {
            return (c.year == Number(country));
        }));

        /*dbUn.find({ year: Number(country) }, function(err, unemployments) {
            if (err)
                res.send(500)
            console.log(Date() + " - GET /unemployments/" + country);
            res.send(unemployments)
        });*/
    }
});

//GET by country and year
app.get(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - GET /unemployments/" + country + "/" + year);

    res.send(initialsUnemployments.filter((c) => {
        return (c.country == country);
    }).filter((c) => {
        return (c.year == year);
    }));

    /*dbUn.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, unemployments) {
        if (err)
            res.send(500)
        console.log(Date() + " - GET /unemployments/" + country + "/" + year);
        res.send(unemployments)
    });*/
});

//DELETE all
app.delete(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - DELETE /unemployments");
    initialsUnemployments = [];

    dbUn.remove({}, { multi: true }, function(err, numRemoved) {
        if (err)
            res.send(500)
        console.log(Date() + " - DELETE /unemployments");
        console.log(numRemoved + " elements removed.")
    });

    res.sendStatus(200);
});

//DELETE by country or year
app.delete(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;

    if (isNaN(country)) {
        initialsUnemployments = initialsUnemployments.filter((c) => {
            return (c.country != country);
        });

        /*dbUn.remove({ country: country }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /unemployments/" + country);
            console.log(numRemoved + " countries removed.")
        });*/
    }
    else {
        initialsUnemployments = initialsUnemployments.filter((c) => {
            return (c.year != Number(country));
        });

        /*dbUn.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /unemployments/" + country);
            console.log(numRemoved + " countries removed.")
        });*/
    }
    res.sendStatus(200);
});

//DELETE by country and year
app.delete(BASE_API_PATH_UNEMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;

    console.log(Date() + " - DELETE /unemployments/" + country + "/" + year);

    initialsUnemployments = initialsUnemployments.filter((c) => {
        return (c.country != country && c.year != year);
    });

    /*dbUn.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
        if (err)
            res.send(500)
        res.sendStatus(200);
        console.log(Date() + " - DELETE /unemployments/" + year);
        console.log(numRemoved + "elements removed.")
    });*/

    res.sendStatus(200);
});

//POST
app.post(BASE_API_PATH_UNEMPLOYMENTS, (req, res) => {
    console.log(Date() + " - POST /unemployments");
    var unemployment = req.body;

    initialsUnemployments.push(unemployment);

    /*dbUn.insert({}, function(err, unemployment) {
        if (err)
            res.sendStatus(500)
    });*/

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
    var unemployment = req.body;
    console.log(Date() + " - PUT /unemployments");
    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    var unemployment = req.body;

    console.log(Date() + " - PUT /unemployments/" + country);

    res.sendStatus(405);
});

app.put(BASE_API_PATH_UNEMPLOYMENTS + "/:year", (req, res) => {
    var year = req.params.year;
    var unemployment = req.body;

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

    initialsUnemployments = initialsUnemployments.map((c) => {
        if (c.country == unemployment.country && c.year == unemployment.year)
            return unemployment;
        else
            return c;
    });

    dbUn.update({ $and: [{ country: country }, { year: Number(year) }] }, unemployment, (err, numUpdated) => {
        console.log("Updated: " + numUpdated);
    });

    res.sendStatus(200);
});

//employments-by-status--------------------------------------------------------------------------------------------------------------->
//GET all DB
app.get(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
    dbEm.find({}, function(err, employment) {
        console.log(Date() + " - GET /employments");
        res.send(initialsEmployments);
        //res.send(employment)
    });
});

//GET for a city or year
app.get(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    if (isNaN(country)) {
        res.send(initialsEmployments.filter((c) => {
            return (c.country == country);
        }));

        /*dbEm.find({ country: country }, function(err, employments) {
            if (err)
                res.send(500)
            console.log(Date() + " - GET /unemployments/" + country);
            res.send(employments)
        });*/
    }
    else {
        res.send(initialsUnemployments.filter((c) => {
            return (c.year == Number(country));
        }));

        /*dbEm.find({ year: Number(country) }, function(err, employments) {
            if (err)
                res.send(500)
            console.log(Date() + " - GET /employments/" + country);
            res.send(employments)
        });*/
    }
});

//GET by country and year
app.get(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - GET /employments/" + country + "/" + year);

    res.send(initialsEmployments.filter((c) => {
        return (c.country == country);
    }).filter((c) => {
        return (c.year == year);
    }));

    /*dbEm.find({ $and: [{ country: country }, { year: Number(year) }] }, function(err, employments) {
        if (err)
            res.send(500)
        console.log(Date() + " - GET /employments/" + country + "/" + year);
        res.send(employments)
    });*/
});

//DELETE all
app.delete(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
    console.log(Date() + " - DELETE /employments");

    initialsEmployments = [];

    dbEm.remove({}, { multi: true }, function(err, numRemoved) {
        if (err)
            res.send(500)
        console.log(Date() + " - DELETE /employments");
        console.log(numRemoved + " elements removed.")
    });

    res.sendStatus(200);
});

//DELETE by country or year
app.delete(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;

    if (isNaN(country)) {
        initialsUnemployments = initialsEmployments.filter((c) => {
            return (c.country != country);
        });

        dbEm.remove({ country: country }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /employments/" + country);
            console.log(numRemoved + " countries removed.")
        });
    }
    else {
        initialsEmployments = initialsEmployments.filter((c) => {
            return (c.year != Number(country));
        });

        dbEm.remove({ year: Number(country) }, { multi: true }, function(err, numRemoved) {
            if (err)
                res.send(500)
            res.sendStatus(200);
            console.log(Date() + " - DELETE /employments/" + country);
            console.log(numRemoved + " countries removed.")
        });
    }
    res.sendStatus(200);
});

//DELETE by country and year
app.delete(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;

    console.log(Date() + " - DELETE /employments/" + country + "/" + year);

    initialsEmployments = initialsEmployments.filter((c) => {
        return (c.country != country && c.year != year);
    });

    dbEm.remove({ $and: [{ country: country }, { year: Number(year) }] }, { multi: true }, function(err, numRemoved) {
        if (err)
            res.send(500)
        res.sendStatus(200);
        console.log(Date() + " - DELETE /employments/" + year);
        console.log(numRemoved + "elements removed.")
    });

    res.sendStatus(200);
});

//POST
app.post(BASE_API_PATH_EMPLOYMENTS, (req, res) => {
    console.log(Date() + " - POST /employments");
    var unemployment = req.body;
    initialsUnemployments.push(unemployment);

    /*dbUn.insert({}, function(err, unemployment) {
        if (err)
            res.sendStatus(500)
    });*/

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
    var unemployment = req.body;
    console.log(Date() + " - PUT /employments");
    res.sendStatus(405);
});

app.put(BASE_API_PATH_EMPLOYMENTS + "/:country", (req, res) => {
    var country = req.params.country;
    var unemployment = req.body;

    console.log(Date() + " - PUT /employments/" + country);

    res.sendStatus(405);
});

app.put(BASE_API_PATH_EMPLOYMENTS + "/:year", (req, res) => {
    var year = req.params.year;
    var unemployment = req.body;

    console.log(Date() + " - PUT /employments/" + year);

    res.sendStatus(405);
});

app.put(BASE_API_PATH_EMPLOYMENTS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    var employment = req.body;

    console.log(Date() + " - PUT /unemployments/" + country + "/" + year);

    if (country != employment.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return 1;
    }

    initialsEmployments = initialsEmployments.map((c) => {
        if (c.country == employment.country && c.year == employment.year)
            return employment;
        else
            return c;
    });

    /*dbEm.update({ $and: [{ country: country }, { year: Number(year) }] }, employment, (err, numUpdated) => {
        console.log("Updated: " + numUpdated);
    });*/

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Server ready on port: " + port + "!")
}).on("error", (e) => {
    console.log("Server NOT READY:" + e)
});

console.log("Server setting up...")
