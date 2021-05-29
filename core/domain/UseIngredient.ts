import Ingredient from "./Ingredient";
import Unity from "./Unity";

export default class UseIngredient {
  idRecette?: number;
  idIngredient?: number;
  idUnite?: number;
  qte?: number;
  ingredient?: Ingredient;
  unite?: Unity;
  checked?: boolean;
}
