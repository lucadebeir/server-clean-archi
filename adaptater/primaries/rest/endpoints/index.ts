import { Router } from "express";
import recipesRoute from "./Recipe";
import categoriesRoute from "./Category";
import ingredientsRoute from "./Ingredient";
import unitiesRoute from "./Unity";
import commentairesRoute from "./Commentaire";
import favoriRoute from "./Favori";
import menuRoute from "./Menu";

const routes = Router();

routes.use("/recipes", recipesRoute);
routes.use("/categories", categoriesRoute);
routes.use("/ingredients", ingredientsRoute);
routes.use("/unites", unitiesRoute);
routes.use("/commentaires", commentairesRoute);
routes.use("/favoris", favoriRoute);
routes.use("/menu", menuRoute);

export default routes;
