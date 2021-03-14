import { Router } from "express";
import recipesRoute from "./Recipe";

const routes = Router();

routes.use("/recipes", recipesRoute);

export default routes;
