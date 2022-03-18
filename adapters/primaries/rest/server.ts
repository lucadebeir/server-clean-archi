//déclaration de l'application
import express from "express";
import cors from "cors";
//routes
import routes from "./endpoints/index";
//import sanitizer from "express-sanitizer";

const app = express();
//déclaration du port
const port = process.env.PORT || 3000;

//pour utiliser les variables d'environnement
require("dotenv").config();

if(process.env.NODE_ENV === 'production') {
  const corsOptions = {
    origin: ["http://localhost:3007", "https://marinesrecipes.fr"],
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

//déclaration de ce que l'app utilise comme module
//app.use(sanitizer());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//lancement serveur
app.listen(port, function () {
  console.log("Server is running on port " + port);
  console.log(process.env.NODE_ENV);
});

module.exports = app;
