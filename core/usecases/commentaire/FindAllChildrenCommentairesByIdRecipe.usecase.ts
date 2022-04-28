import Commentaire from "../../domain/Commentaire";
import {BusinessException} from "../../exceptions/BusinessException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class FindAllChildrenCommentairesByIdRecipeUsecase {
  constructor(private commentaireRepository: CommentaireRepository, private recipeRepository: RecipeRepository) {}

  execute = async (id: any, idCommentaire: any): Promise<Commentaire[]> => {
    await this.checkBusinessRules(id, idCommentaire);
    return await this.commentaireRepository.findAllChildrenCommentairesByIdRecette(id, idCommentaire);
  };

  private checkBusinessRules = async (id: any, idCommentaire: any): Promise<void> => {
    if(id) {
      if(await this.recipeRepository.existById(id)) {
        if(idCommentaire) {
          if(!await this.commentaireRepository.existById(idCommentaire)) throw new BusinessException("La commentaire n'existe pas");
        } else throw new BusinessException("L'identifiant d'un commentaire est obligatoire");
      } else throw new BusinessException("La recette n'existe pas");
    } else throw new BusinessException("L'identifiant d'une recette est obligatoire");
  };
}
