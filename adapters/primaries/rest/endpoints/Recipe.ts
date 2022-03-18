import express from "express";
import cors from "cors";
import RecipeConfig from "../config/RecipeConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const recipe = express.Router();
recipe.use(cors());

const recipeConfig = new RecipeConfig();

//Récupérer toutes les recettes
recipe.get("/all", (req, res) => {
    recipeConfig
        .getAllRecipeUseCase()
        .execute("desc")
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupérer toutes les recettes dans l'ordre alphabétique
recipe.get("/all/asc", (req, res) => {
    recipeConfig
        .getAllRecipeUseCase()
        .execute("asc")
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupérer toutes les recettes dans l'ordre des plus vues
recipe.get("/all/desc/views", (req, res) => {
    recipeConfig
        .getAllPerToNbViewUseCase()
        .execute()
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Research
recipe.post("/research/filter", (req, res) => {
    recipeConfig
        .researchFilterUseCase()
        .execute(req.body)
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupérer la recette depuis son identifiant
recipe.get("/get/:id", (req, res) => {
    recipeConfig
        .getRecipeByIdUseCase()
        .execute(req.params.id)
        .then((recipe: any) => {
            if (recipe) {
                res.json(recipe);
            } else {
                res.send("Mauvais identifiant");
            }
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//recupérer les ingrédients d'une recette à partir de son id
recipe.get("/:id/ingredients", (req, res) => {
    recipeConfig
        .getIngredientsByIdRecipeUseCase()
        .execute(req.params.id)
        .then((ingredients: any) => {
            if (ingredients) {
                res.json(ingredients);
            } else {
                res.send("Mauvais identifiant");
            }
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//recupérer les catégories d'une recette à partir de son id
recipe.get("/:id/categories", (req, res) => {
    recipeConfig
        .getCategoriesByIdRecipeUseCase()
        .execute(req.params.id)
        .then((categories: any) => {
            if (categories) {
                res.json(categories);
            } else {
                res.send("Mauvais identifiant");
            }
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupérer les 3 recettes les plus récentes
recipe.get("/latest", (req, res) => {
    recipeConfig
        .getLatestRecipesUseCase()
        .execute()
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupérer les 3 recettes les plus vues
recipe.get("/popular", (req, res) => {
    recipeConfig
        .getMostPopularRecipesUseCase()
        .execute()
        .then((recipes: any) => {
            res.json(recipes);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//créer une recette
recipe.post("/add", authenticateJWT, (req, res) => {
    recipeConfig
        .createRecipeUseCase()
        .execute(req.body, req.body.user)
        .then((recipe: any) => {
            res.json(recipe);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//modifier une recette
recipe.post("/update/:id", authenticateJWT, (req, res) => {
    recipeConfig
        .updateRecipeUseCase()
        .execute(req.body, req.body.user)
        .then((recipe: any) => {
            res.json(recipe);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//incrémente le nombre de vues de +1
recipe.post("/update/views/:id", (req, res) => {
    recipeConfig
        .updateNbViewsUseCase()
        .execute(req.params.id)
        .then((recipe: any) => {
            res.json(recipe);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//supprimer une recette
recipe.delete("/:id", authenticateJWT, (req, res) => {
    recipeConfig
        .deleteRecipeUseCase()
        .execute(req.params.id, req.body.user)
        .then((recipe: any) => {
            res.json(recipe);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

export default recipe;
