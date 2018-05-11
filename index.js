var port = (process.env.PORT || 1600);
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var request = require("request");

var expendituresApi = require("./apiExpenditures/expenditures.js");
var expendituresApi2 = require("./apiExpenditures/expendituresv2.js");
var employmentsApi = require("./apiEmployments/employments2.js");
var unemploymentsApi = require("./apiUnemployments/unemployments.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname + "/public")));

expendituresApi.register(app,request);
expendituresApi2.register(app,request);
employmentsApi.register(app);
unemploymentsApi.register(app);
var dirProxyJA = "https://sos1718-08.herokuapp.com";
//Colocación de proxys
app.use("/proxyJA", function(req, res) {
    var url = dirProxyJA + req.url;
    req.pipe(request(url)).pipe(res);
});



app.listen(port, () => {
    console.log("Server ready on port: " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");
