import Commentaire from "../../domain/Commentaire";
import { BusinessException } from "../../exceptions/BusinessException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetAllChildrenCommentairesByIdRecipeUseCase {
  constructor(private commentaireRepository: CommentaireRepository, private recipeRepository: RecipeRepository) {}

  async execute(id: any, idCommentaire: any): Promise<Commentaire[]> {
    this.checkBusinessRules(id, idCommentaire);
    return await this.commentaireRepository.findAllChildrenCommentairesByIdRecette(
      id,
      idCommentaire
    );
  }

  private checkBusinessRules(id: any, idCommentaire: any): void {
    if(id) {
      if(this.recipeRepository.existById(id)) {
        if(idCommentaire) {
          if(!this.commentaireRepository.existById(idCommentaire)) {
            throw new BusinessException("La commentaire n'existe pas");
          }
        } else {
          throw new BusinessException("L'identifiant d'un commentaire est obligatoire")
        }
      } else {
        throw new BusinessException("La recette n'existe pas");
      }
    } else {
      throw new BusinessException("L'identifiant d'une recette est obligatoire")
    }
  }
}
