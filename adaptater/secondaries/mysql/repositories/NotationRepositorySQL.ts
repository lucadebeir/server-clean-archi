import NotationDomain from "../../../../core/domain/Notation.domain";
import NotationRepository from "../../../../core/ports/repositories/Notation.repository";
import NotationSequelize from "../entities/Notation.model";

export default class NotationRepositorySQL implements NotationRepository {
  findByPseudo(idRecipe: number, pseudo: string): Promise<NotationDomain> {
    return NotationSequelize.findOne({
      where: {
        idRecette: idRecipe,
        pseudo: pseudo,
      },
    })
      .then((res) => {
        if (res) {
          return res;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  save(notation: NotationDomain): Promise<NotationDomain> {
    return NotationSequelize.create(notation)
      .then((notationCreate) => {
        if (notationCreate) {
          return notationCreate;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
