import Category from "./Category.domain";
import ClassifyIn from "./ClassifyIn";
import ImageDomain from "./Image.domain";
import UseIngredient from "./UseIngredient";
import Etape from "./Etape.domain";

export default class Recipe {
  id?: number;
  name?: string;
  date?: Date;
  number_favorites?: number;
  number_views?: number;
  steps?: Etape[];
  number_portion?: number;
  name_portion?: string;
  preparation_time?: string;
  rest_time?: string;
  astuce?: string;
  images?: ImageDomain[];
  ingredients?: UseIngredient[];
  recipes__categories?: ClassifyIn[];
  categories?: Category[];
  mot?: string;
  menu?: number;
  note?: number;
}
