import { Time } from "@angular/common";
import Category from "./Category.domain";
import Ingredient from "./Ingredient";

export default class Recipe {
  idRecette?: number;
  nomRecette?: string;
  datePublication?: Date;
  nbFavoris?: number;
  nbVues?: number;
  etapes?: string;
  nbrePart?: number;
  libellePart?: string;
  tempsPreparation?: Time;
  tempsCuisson?: Time;
  astuce?: string;
  lienImage?: any;
  idImage?: number;
  ingredients?: Ingredient[];
  globalTime?: string;
  categories?: Category[];
  idMenu?: number;
  mot?: string;
  vege?: boolean;
}
