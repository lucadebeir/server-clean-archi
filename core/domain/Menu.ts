import Recipe from "./Recipe";
import HashMap from "hashmap";

export default class Menu {
  map?: HashMap<number, Recipe> = new HashMap();
  id?: number;
  id_recipe?: number;
  name?: string;
}
