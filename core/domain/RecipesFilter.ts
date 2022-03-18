import Time from "./Time";
import Category from "./Category";

export default class RecipesFilter {
  categories: Category[];
  times: Time[];
  popular: boolean;
  idsCategories: number[];
}
