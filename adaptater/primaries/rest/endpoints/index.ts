import { Router } from "express";
import recipesRoute from "./Recipe";
import categoriesRoute from "./Category";
import ingredientsRoute from "./Ingredient";

const routes = Router();

routes.use("/recipes", recipesRoute);
routes.use("/categories", categoriesRoute);
routes.use("/ingredients", ingredientsRoute);

export default routes;
