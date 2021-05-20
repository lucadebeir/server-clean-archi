import TimeDomain from "./Time.domain";
import Category from "./Category.domain";

export default class RecipesFilterDomain {
  categories?: Category[];
  time?: TimeDomain[];
  popular?: boolean;
  idsCategories?: number[];
}
