import Category from "./Category";
import ClassifyIn from "./ClassifyIn";
import Image from "./Image";
import UseIngredient from "./UseIngredient";
import Etape from "./Etape";
import IllustrateRecipe from "./IllustrateRecipe";
import Ingredient from "./Ingredient";
import Unity from "./Unity";
import {BusinessException} from "../exceptions/BusinessException";

export default class Recipe {
    id?: number;
    name?: string;
    date?: Date = new Date();
    number_favorites?: number;
    number_views?: number;
    steps?: Etape[] = [];
    number_portion?: number;
    name_portion?: string;
    preparation_time?: string;
    cooking_time?: string;
    rest_time?: string;
    astuce?: string;
    images?: Image[];
    recipes__ingredients__units?: UseIngredient[] = [];
    recipes__categories?: ClassifyIn[] = [];
    recipes__images?: IllustrateRecipe[] = [];
    categories?: Category[] = [];
    mot?: string;
    menu?: number;
    note?: number;
    difficulty: number;

    isValid = (): boolean => {
        let isValid: boolean = false;
        if (this) {
            this.checkIfValueIsEmpty(this.name, "name");
            this.checkIfValueIsEmpty(this.name_portion, "name_portion");
            this.checkIfValueIsEmpty(this.number_portion, "number_portion");
            this.checkIfValueIsEmpty(this.preparation_time, "preparation_time");
            this.checkIfValueIsValid(60, this.name, "name");
            this.checkIfValueIsValid(50, this.name_portion, "name_portion");

            if (this.number_portion == 0 || this.number_portion! < 0) {
                throw new BusinessException("Le nombre de part doit être strictement supérieur à 0");
            }

            if (this.recipes__ingredients__units?.length == 0 || !this.recipes__ingredients__units) {
                throw new BusinessException("Il faut sélectionner au moins un ingrédient pour créer une recette");
            } else {
                this.recipes__ingredients__units?.map(async (ingredient) => {
                    if (ingredient.quantity == 0 || ingredient.quantity! < 0) {
                        throw new BusinessException("Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0");
                    } else {
                        isValid = true;
                    }
                });
            }
        }

        if (this.recipes__categories?.length == 0 || !this.recipes__categories) {
            throw new BusinessException("Il faut sélectionner au moins une catégorie pour créer une recette");
        }

        if (this.recipes__images?.length == 0 || !this.recipes__images) {
            throw new BusinessException("Il faut sélectionner au moins une image pour créer une recette");
        }

        return isValid;
    }

    addIngredient = (ingredient: Ingredient, unit: Unity, quantity: number): void => {
        if (!this.recipes__ingredients__units) this.recipes__ingredients__units = [];
        this.recipes__ingredients__units.push({
            id_ingredient: ingredient.id,
            id_unit: unit.id,
            quantity: quantity,
            id_recipe: this.id
        });
    };

    addCategorie = (category: Category): void => {
        if (!this.recipes__categories) this.recipes__categories = [];
        this.recipes__categories.push({
            id_category: category.id,
            id_recipe: this.id
        });
    }

    addImage = (image: Image): void => {
        if (!this.recipes__images) this.recipes__images = [];
        this.recipes__images.push({
            id_image: image.id,
            id_recipe: this.id
        })
    }

    private checkIfValueIsEmpty = (value: any, champ?: string): void => {
        if (!value && value != 0) {
            throw new BusinessException("Le champ " + champ + " d'une recette est obligatoire");
        }
    };

    private checkIfValueIsValid = (chiffre: number, value?: string, champ?: string): void => {
        if (value && value.length > chiffre) {
            throw new BusinessException("Le champ " + champ + " d'une recette ne doit pas dépasser " + chiffre + " caractères");
        }
    };
}
