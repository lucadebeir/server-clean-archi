//déclaration de l'application
import express from "express";
import cors from "cors";
//import sanitizer from "express-sanitizer";

const app = express();

//déclaration du port
const port = process.env.PORT || 3000;

//déclaration de ce que l'app utilise comme module
//app.use(sanitizer());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
import routes from "./endpoints/index";
import path from "path";
app.use(routes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "my-header,X-Requested-With,content-type,Authorization"
  );
  //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.

  next();
});

//Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

//lancement serveur
app.listen(port, function () {
  console.log("Server is running on port " + port);
  console.log(process.env.NODE_ENV);
});

module.exports = app;
