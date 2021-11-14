import Ingredient from "./Ingredient";
import Unity from "./Unity";

export default class Shopping {
  id?: number;
  pseudo: string;
  id_ingredient?: number;
  ingredient?: Ingredient;
  name_ingredient: string;
  quantity: number;
  id_unit?: number;
  unit?: Unity;
}
