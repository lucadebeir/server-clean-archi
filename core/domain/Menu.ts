import Recipe from "./Recipe";
import HashMap from "hashmap";

export default class Menu {
  map?: HashMap<number, Recipe> = new HashMap();
  idMenu?: number;
  idRecette?: number;
}
