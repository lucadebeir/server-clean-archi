import IllustrateCommentaire from "../../../../core/domain/IllustrateCommentaire";
import IllustrateCommentaireRepository from "../../../../core/ports/repositories/IllustrateCommentaire.repository";
import IllustrateCommentaireSequelize from "../entities/IllustrateCommentaire.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class IllustrateCommentaireRepositorySQL implements IllustrateCommentaireRepository {

  addToCommentaire(illustrateCommentaire: IllustrateCommentaire): Promise<string> {
    const data = {
      id_image: illustrateCommentaire.id_image,
      id_commentaire: illustrateCommentaire.id_commentaire,
    };
    return IllustrateCommentaireSequelize.create(data)
      .then(() => {
        return "Image ajoutée avec succès au commentaire";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  updateFromCommentaire(illustrateCommentaire: IllustrateCommentaire): Promise<string> {
    return IllustrateCommentaireSequelize.update(
      { id_image: illustrateCommentaire.id_image },
      { where: { id_commentaire: illustrateCommentaire.id_commentaire } }
    )
      .then(() => {
        return "Image modifiée avec succès";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  check(illustrateCommentaire: IllustrateCommentaire): Promise<boolean> {
    return IllustrateCommentaireSequelize.findOne({
      where: {
        id_commentaire: illustrateCommentaire.id_commentaire,
        id_image: illustrateCommentaire.id_image,
      },
    })
      .then((result: any) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

}
