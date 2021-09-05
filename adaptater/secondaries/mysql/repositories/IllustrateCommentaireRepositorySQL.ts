import IllustrateCommentaireDomain from "../../../../core/domain/IllustrateCommentaire.domain";
import IllustrateCommentaireRepository from "../../../../core/ports/repositories/IllustrateCommentaire.repository";
import IllustrateCommentaireSequelize from "../entities/IllustrateCommentaire.model";

export default class IllustrateCommentaireRepositorySQL
  implements IllustrateCommentaireRepository {
  addToCommentaire(
    illustrateCommentaire: IllustrateCommentaireDomain
  ): Promise<string> {
    const data = {
      id_image: illustrateCommentaire.id_image,
      id_commentaire: illustrateCommentaire.id_commentaire,
    };
    return IllustrateCommentaireSequelize.create(data)
      .then(() => {
        return "Image ajoutée avec succès au commentaire";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateFromCommentaire(
    illustrateCommentaire: IllustrateCommentaireDomain
  ): Promise<string> {
    return IllustrateCommentaireSequelize.update(
      { id_image: illustrateCommentaire.id_image },
      { where: { id_commentaire: illustrateCommentaire.id_commentaire } }
    )
      .then(() => {
        return "Image modifiée avec succès";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  check(illustrateCommentaire: IllustrateCommentaireDomain): Promise<boolean> {
    return IllustrateCommentaireSequelize.findOne({
      where: {
        id_commentaire: illustrateCommentaire.id_commentaire,
        id_image: illustrateCommentaire.id_image,
      },
    })
      .then((result: any) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
