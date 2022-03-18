import Commentaire from "../../domain/Commentaire";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class UpdateCommentaireUseCase {
  constructor(
    private commentaireRepository: CommentaireRepository,
    private userRepository: UserRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    commentaire: Commentaire,
    token?: Token
  ): Promise<Commentaire> {
    await this.checkBusinessRules(commentaire, token);
    return await this.commentaireRepository.update(commentaire);
  }

  private async checkBusinessRules(
    commentaire: Commentaire,
    token?: Token
  ): Promise<void> {
    if (token && isLogin(token)) {
      if (commentaire.pseudo) {
        if (await this.userRepository.existByPseudo(commentaire.pseudo)) {
          if (token.pseudo === commentaire.pseudo) {
            if (commentaire.id_recipe) {
              if (await this.recipeRepository.existById(commentaire.id_recipe)) {
                if (commentaire.id) {
                  if (
                    await this.commentaireRepository.existById(
                      commentaire.id
                    )
                  ) {
                    if (commentaire.message) {
                      if (
                        commentaire.parent &&
                        await !this.commentaireRepository.existById(
                          commentaire.parent
                        )
                      ) {
                        throw new BusinessException(
                          "Le commentaire parent n'existe pas"
                        );
                      }
                    } else {
                      throw new BusinessException("Le message est obligatoire");
                    }
                  } else {
                    throw new BusinessException("Le commentaire n'existe pas");
                  }
                } else {
                  throw new BusinessException("L'identifiant est obligatoire");
                }
              } else {
                throw new BusinessException("La recette n'existe pas");
              }
            } else {
              throw new BusinessException(
                "L'identifiant d'une recette est obligatoire"
              );
            }
          } else {
            throw new BusinessException(
              "La personne connectée n'est pas la personne correspondant au pseudo en question"
            );
          }
        } else {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
      } else {
        throw new BusinessException(
          "L'identifiant d'un utilisateur est obligatoire"
        );
      }
    } else {
      throw new TechnicalException(
        "Vous ne pouvez pas modifier cette ressource"
      );
    }
  }
}
