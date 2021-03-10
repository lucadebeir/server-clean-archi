//déclaration de l'application
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

//déclaration du port
var port = process.env.PORT || 3000;

//déclaration de ce que l'app utilise comme module
//app.use(sanitizer());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const dotenv = require("dotenv");
dotenv.config();

//lancement serveur
app.listen(port, function () {
    console.log("Server is running on port " + port);
});