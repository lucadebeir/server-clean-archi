import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import {isLogin} from "../../utils/token.service";
import Shopping from "../../domain/Shopping";

export default class AddIngredientsOfRecipeToShoppingListUseCase {
    constructor(private shoppingRepository: ShoppingRepository) {}

    async execute(pseudo: any, list: Shopping[], token?: Token): Promise<string> {
        await this.checkBusinessRules(pseudo, token);
        list.map(async value => await this.shoppingRepository.addIngredientToShoppingList(value));
        return "Les ingrédients de la recette sont bien ajoutés à la liste de courses de l'utilisateur";
    }

    private checkBusinessRules = async (pseudo: any, token?: Token): Promise<void> => {
        if (token && isLogin(token)) {
            if (!pseudo) throw new BusinessException("L'identifiant d'un utilisateur est obligatoire");
        } else {
            throw new TechnicalException("Vous n'avez pas le droit d'ajouter ces ressources");
        }
    };
}
