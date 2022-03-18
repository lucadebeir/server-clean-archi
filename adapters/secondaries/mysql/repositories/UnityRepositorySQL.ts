import Unity from "../../../../core/domain/Unity";
import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import UnitySequelize from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class UnityRepositorySQL implements UnityRepository {

    existById(id: any): Promise<boolean> {
        return UnitySequelize.findOne({
            where: {
                id: id,
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    create(unityToCreate: Unity): Promise<Unity> {
        return UnitySequelize.create(unityToCreate)
            .then((unityCreate) => {
                return unityCreate;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAll(): Promise<Unity[]> {
        return UnitySequelize.findAll({
            order: [["name", "ASC"]],
        })
            .then((unity) => {
                return unity;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findById(id: any): Promise<Unity> {
        return UnitySequelize.findOne({
            where: {
                id: id,
            },
        })
            .then((unity: any) => {
                return unity;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    deleteById(id: any): Promise<string> {
        return UnitySequelize.destroy({
            where: {
                id: id,
            },
        })
            .then(() => {
                return "Unite deleted!";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    update(unityToUpdate: Unity): Promise<Unity> {
        return UnitySequelize.update(
            {name: unityToUpdate.name},
            {where: {id: unityToUpdate.id}}
        )
            .then(() => {
                return unityToUpdate;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    checkExistByName(name: any): Promise<boolean> {
        return UnitySequelize.findOne({
            where: {
                name: name,
            },
        })
            .then((unity) => {
                return !!unity;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    checkExistInRecipes(id: any): Promise<boolean> {
        return UseIngredientSequelize.findOne({
            where: {
                id_unit: id,
            },
        })
            .then((unity) => {
                return !!unity;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
