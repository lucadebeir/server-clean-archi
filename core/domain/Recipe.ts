import { Time } from "@angular/common";
import Category from "./Category.domain";
import ClassifyIn from "./ClassifyIn";
import ImageDomain from "./Image.domain";
import Ingredient from "./Ingredient";
import UseIngredient from "./UseIngredient";

export default class Recipe {
  idRecette?: number;
  nomRecette?: string;
  datePublication?: Date;
  nbFavoris?: number;
  nbVues?: number;
  etapes?: string;
  nbrePart?: number;
  libellePart?: string;
  tempsPreparation?: string;
  tempsCuisson?: string;
  astuce?: string;
  images?: ImageDomain[];
  utiliserIngredients?: UseIngredient[];
  classerDans?: ClassifyIn[];
  categories?: Category[];
  mot?: string;
}
