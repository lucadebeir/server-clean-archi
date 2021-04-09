import IllustrateCommentaireDomain from "../../../../core/domain/IllustrateCommentaire.domain";
import IllustrateCommentaireRepository from "../../../../core/ports/repositories/IllustrateCommentaire.repository";
import IllustrateCommentaireSequelize from "../entities/IllustrateCommentaire.model";

export default class IllustrateCommentaireRepositorySQL
  implements IllustrateCommentaireRepository {
  addToCommentaire(
    illustrateCommentaire: IllustrateCommentaireDomain
  ): Promise<string> {
    const data = {
      idImage: illustrateCommentaire.idImage,
      idCommentaire: illustrateCommentaire.idCommentaire,
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
      { idImage: illustrateCommentaire.idImage },
      { where: { idCommentaire: illustrateCommentaire.idCommentaire } }
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
        idCommentaire: illustrateCommentaire.idCommentaire,
        idImage: illustrateCommentaire.idImage,
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
