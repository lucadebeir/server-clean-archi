import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isAdmin} from "../../utils/token.service";

export default class CreateRecipeUseCase {
    constructor(
        private recipeRepository: RecipeRepository,
        private mailingRepository: MailingRepository,
        private userRepository: UserRepository //
    ) {
    } //constructeur avec l'interface

    async execute(recipe: Recipe, token: Token): Promise<Recipe> {
        try {
            await this.checkBusinessRules(recipe, token);

            return await this.recipeRepository.create(recipe)/**.then(async result => {
                const users: { name: any; address: any; }[] = await this.userRepository.findAllAbonneMailUsers();

                users.map((user) => {
                    const data = {
                        recipe: result,
                        user: user,
                    };
                    this.mailingRepository.sendMailWhenNewRecipe(data);
                });

                return result;
            })**/;
        } catch (e) {
            throw e;
        }

    }

    private checkBusinessRules = async (recipe: Recipe, token: Token): Promise<void> => {
        if (token && isAdmin(token)) {
            if (recipe) {
                if (recipe.id) {
                    this.checkIfValueIsEmpty(recipe.name, "name");
                    this.checkIfValueIsEmpty(recipe.name_portion, "name_portion");
                    this.checkIfValueIsEmpty(recipe.number_portion, "number_portion");
                    this.checkIfValueIsEmpty(recipe.preparation_time, "preparation_time");
                    this.checkIfValueIsValid(60, recipe.name, "name");
                    this.checkIfValueIsValid(50, recipe.name_portion, "name_portion");

                    if (recipe.number_portion == 0 || recipe.number_portion! < 0) {
                        throw new BusinessException("Le nombre de part doit être strictement supérieur à 0");
                    }

                    if (recipe.recipes__ingredients__units?.length == 0 || !recipe.recipes__ingredients__units) {
                        throw new BusinessException("Il faut sélectionner au moins un ingrédient pour créer une recette");
                    } else {
                        recipe.recipes__ingredients__units?.map(async (ingredient) => {
                            if (ingredient.quantity == 0 || ingredient.quantity! < 0) {
                                throw new BusinessException("Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0");
                            }
                        });
                    }

                    if (recipe.recipes__categories?.length == 0 || !recipe.recipes__categories) {
                        throw new BusinessException("Il faut sélectionner au moins une catégorie pour créer une recette");
                    }

                    if (recipe.recipes__images?.length == 0 || !recipe.recipes__images) {
                        throw new BusinessException("Il faut sélectionner au moins une image pour créer une recette");
                    }
                } else {
                    if (await this.recipeRepository.existByName(recipe.name)) {
                        throw new BusinessException("La recette " + recipe.name + " existe déjà.");
                    }
                }
            } else {
                throw new TechnicalException("Un objet de type Recette est requis pour créer une recette");
            }
        } else {
            throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
        }
    };

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
