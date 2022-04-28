import {decoder} from "./codage";
import {addHours, globalTimeToString} from "./time";
import {avgNote} from "./calcul";
import Recipe from "../domain/Recipe";

export const updateDataRecipe = (recipe: Recipe): Recipe => {
  recipe.name = decoder(recipe.name);
  recipe.global_time = addHours(
    globalTimeToString(recipe.preparation_time, recipe.rest_time)
  );
  recipe.astuce = decoder(recipe.astuce);
  recipe.mot = decoder(recipe.mot);

  if(recipe.ratings) recipe.average_rate = avgNote(recipe.ratings);

  return recipe;
};
