import Ingredient from "./Ingredient";
import Unity from "./Unity";

export default class UseIngredient {
  id_recipe?: number;
  id_ingredient?: number;
  id_unit?: number;
  quantity?: number;
  ingredient?: Ingredient;
  unite?: Unity;
  checked?: boolean;
}
