var port = (process.env.PORT || 1600);
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");

var expendituresApi = require("./apiExpenditures/expenditures.js");
var expendituresApi2 = require("./apiExpenditures/expendituresv2.js");
var employmentsApi = require("./apiEmployments/employments2.js");
var unemploymentsApi = require("./apiUnemployments/unemployments.js");
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname + "/public")));

expendituresApi.register(app);
expendituresApi2.register(app);
employmentsApi.register(app);
unemploymentsApi.register(app);

app.listen(port, () => {
    console.log("Server ready on port: " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");
