var port = (process.env.PORT || 1607);
var express = require("express");
var app = express();
var DataStore = require("nedb");


var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_EMPLOYMENTS = "/api/v1/employments";
var BASE_API_PATH_UNEMPLOYMENTS = "/api/v1/unemployments";
var BASE_API_PATH_EXPENDITURES = "/api/v1/expenditures";

var dbEmployments = __dirname + "/employments.db";
var dbUnemployments = __dirname + "/unemployments.db";
var dbExpenditures = __dirname + "/expenditures.db";

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var initialsEmployments = [
    { "country": "croatia", "year": 1998, "total-self-employed": 18.5, "total-salaried-employed": 75.30000305, "total-contributing-family-worker": 6.19999980926514 },
    { "country": "cyprus", "year": 2005, "total-self-employed": 20.5, "total-salaried-employed": 76.80000305, "total-contributing-family-worker": 2.799999952 },
    { "country": "romania", "year": 1998, "total-self-employed": 22.60000038, "total-salaried-employed": 59.70000076, "total-contributing-family-worker": 17.79999924 },
    { "country": "romania", "year": 2005, "total-self-employed": 21.39999962, "total-salaried-employed": 64.69999695, "total-contributing-family-worker": 13.80000019 }
];

var initialsUnemployments = [
    { "country": "austria", "year": 1998, "young-unemployment": 1.600000024, "adult-unemployment": 1.600000024, "old-unemployment": 1.600000024, "long-term-unemployment": 1.600000024 },
    { "country": "belgium", "year": 2003, "young-unemployment": 3.5, "adult-unemployment": 3.5, "old-unemployment": 3.5, "long-term-unemployment": 3.5 },
    { "country": "bulgaria", "year": 1998, "young-unemployment": 8, "adult-unemployment": 8, "old-unemployment": 8, "long-term-unemployment": 8 },
    { "country": "croatia", "year": 2003, "young-unemployment": 8, "adult-unemployment": 8, "old-unemployment": 8, "long-term-unemployment": 8 },
    { "country": "austria", "year": 1999, "young-unemployment": 1.399999976, "adult-unemployment": 1.399999976, "old-unemployment": 1.399999976, "long-term-unemployment": 1.399999976 },
    { "country": "italy", "year": 2001, "young-unemployment": 6.0, "adult-unemployment": 6.0, "old-unemployment": 6.0, "long-term-unemployment": 6.0 },
    { "country": "portugal", "year": 2002, "young-unemployment": 11.5, "adult-unemployment": 4.5, "old-unemployment": 2.400000095, "long-term-unemployment": 1.600000024 },
    { "country": "slovak-republic", "year": 2004, "young-unemployment": 32, "adult-unemployment": 16, "old-unemployment": 15.10000038, "long-term-unemployment": 11 }
];


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

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.get(BASE_API_PATH + "/load", (req, res) => {
    dbEx.remove({}, { multi: true });
    dbEm.remove({}, { multi: true });
    dbUn.remove({}, { multi: true });
    dbEx.insert(initialsExpenditures);
    dbEm.insert(initialsEmployments);
    dbUn.insert(initialsUnemployments);
    res.sendStatus(418);
});

app.get(BASE_API_PATH + "/delete", (req, res) => {
    dbEx.remove({}, { multi: true });
    dbEm.remove({}, { multi: true });
    dbUn.remove({}, { multi: true });
    res.sendStatus(418);
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
});

//Unemployments
var dbUn = new DataStore({
    filename: dbUnemployments,
    autoload: true
});

//

var apiExpenditures = require("./apiExpenditures/expenditures.js");
apiExpenditures.register(app, BASE_API_PATH, BASE_API_PATH_EXPENDITURES, dbEx, initialsExpenditures);

var apiUnemployments = require("./apiUnemployments/unemployments.js");
apiUnemployments.register(app, BASE_API_PATH, BASE_API_PATH_UNEMPLOYMENTS, dbUn, initialsUnemployments);

var apiEmployments = require("./apiEmployments/employments.js");
apiEmployments.register(app, BASE_API_PATH, BASE_API_PATH_EMPLOYMENTS, dbEm, initialsEmployments);
//


app.listen(port, () => {
    console.log("Server ready on port: " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");
