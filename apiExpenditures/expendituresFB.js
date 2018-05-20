var BASE_API = "/api/v2";
var BASE_API_PATH = "/api/v2/expendituresFB";
var apiExpendituresFB = {};
module.exports = apiExpendituresFB;

apiExpendituresFB.register = function(app, request, firebase) {
    var serviceAccount = require("./ExpendituresAPI-f47b79f4e2fc.json");
    var admin = require('firebase-admin');
    var config = {
        apiKey: "AIzaSyATXFwBikVugBX9fgJvpRJbWkp4VefGo2Q",
        authDomain: "expendituresapi.firebaseapp.com",
        databaseURL: "https://expendituresapi.firebaseio.com",
        projectId: "expendituresapi",
        storageBucket: "expendituresapi.appspot.com",
        messagingSenderId: "297764603438"
    };
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://expendituresapi.firebaseio.com"
    });
    
    firebase.initializeApp(config);

    app.post(BASE_API_PATH, function(request, response) {
        console.log("Post FB");
        var token = request.body.token;
        var db = firebase.database();
        var tokenDevices = db.ref("expendituresapi").push();
        tokenDevices.set({
            token: token
        });
        response.send(request.body.token);
    });
};
