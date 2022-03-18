import Notation from "../../../../core/domain/Notation";
import NotationRepository from "../../../../core/ports/repositories/Notation.repository";
import NotationSequelize from "../entities/Notation.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class NotationRepositorySQL implements NotationRepository {
    findByPseudo(id_recipe: number, pseudo: string): Promise<Notation> {
        return NotationSequelize.findOne({
            where: {
                id_recipe: id_recipe,
                pseudo: pseudo,
            },
        })
            .then((res: any) => {
                return res;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    save(notation: Notation): Promise<Notation> {
        return NotationSequelize.create(notation)
            .then((notationCreate) => {
                return notationCreate;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
