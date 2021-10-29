//déclaration de l'application
import express from "express";
import cors from "cors";
//import sanitizer from "express-sanitizer";

const app = express();

//déclaration du port
const port = process.env.PORT || 3000;

//pour utiliser les variables d'environnement
require("dotenv").config();

//déclaration de ce que l'app utilise comme module
//app.use(sanitizer());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
import routes from "./endpoints/index";
import path from "path";
app.use(routes);

//Serve only the static files form the dist directory
/*app.use(express.static(__dirname + "/dist"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});*/

//lancement serveur
app.listen(port, function () {
  console.log("Server is running on port " + port);
  console.log(process.env.NODE_ENV);
});

module.exports = app;
