import { Router } from "express";
import recipesRoute from "./Recipe";
import categoriesRoute from "./Category";
import ingredientsRoute from "./Ingredient";
import unitiesRoute from "./Unity";
import commentairesRoute from "./Commentaire";
import favoriRoute from "./Favori";
import menuRoute from "./Menu";
import recipeListRoute from "./RecipeList";
import shoppingRoute from "./Shopping";
import userRoute from "./User";
import useIngredientRoute from "./UseIngredient";
import notificationRoute from "./Notification";
import statistiqueRoute from "./Statistique";
import classifyInRoute from "./ClassifyIn";
import imageRoute from "./Image";
import illustrateRoute from "./IllustrateRecipe";

const routes = Router();

routes.use("/recipes", recipesRoute);
routes.use("/categories", categoriesRoute);
routes.use("/ingredients", ingredientsRoute);
routes.use("/unites", unitiesRoute);
routes.use("/commentaires", commentairesRoute);
routes.use("/favoris", favoriRoute);
routes.use("/menu", menuRoute);
routes.use("/list/recipe", recipeListRoute);
routes.use("/shopping", shoppingRoute);
routes.use("/users", userRoute);
routes.use("/use/ingredient", useIngredientRoute);
routes.use("/notifications", notificationRoute);
routes.use("/statistiques", statistiqueRoute);
routes.use("/classify", classifyInRoute);
routes.use("/images", imageRoute);
routes.use("/illustrate/recipe", illustrateRoute);

export default routes;
