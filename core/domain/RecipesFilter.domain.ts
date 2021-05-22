import TimeDomain from "./Time.domain";
import Category from "./Category.domain";

export default class RecipesFilterDomain {
  categories: Category[];
  times: TimeDomain[];
  popular: boolean;
  idsCategories: number[];
}
