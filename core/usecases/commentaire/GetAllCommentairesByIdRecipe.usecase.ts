import Commentaire from "../../domain/Commentaire";
import { BusinessException } from "../../exceptions/BusinessException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetAllCommentairesByIdRecipeUseCase {
  constructor(private commentaireRepository: CommentaireRepository, private recipeRepository: RecipeRepository) {}

  async execute(id: any): Promise<Commentaire[]> {
    this.checkBusinessRules(id);
    return await this.commentaireRepository.findAllCommentairesByIdRecipe(id);
  }

  private checkBusinessRules(id: any): void {
    if(id) {
      if(!this.recipeRepository.existById(id)) {
        throw new BusinessException("La recette n'existe pas")
      }
    } else {
      throw new BusinessException("L'identifiant d'une recette est obligatoire")
    }
  }
}
