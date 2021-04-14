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
app.use(routes);

//lancement serveur
app.listen(port, function () {
  console.log("Server is running on port " + port);
  console.log(process.env.NODE_ENV);
});
