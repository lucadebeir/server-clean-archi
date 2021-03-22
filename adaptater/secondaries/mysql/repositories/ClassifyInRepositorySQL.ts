import ClassifyIn from "../../../../core/domain/ClassifyIn";
import ClassifyInRepository from "../../../../core/ports/repositories/ClassifyIn.repository";
import { ClassifyInSequelize } from "../entities/ClassifyIn.model";

export default class ClassifyInRepositorySQL implements ClassifyInRepository {
    addCategoryToRecipe(classify: ClassifyIn): Promise<string> {
        return ClassifyInSequelize.findOne({
            where: {
                idRecette: classify.idRecette,
                idCategorie: classify.idCategorie
            }
        })
        .then((result) => {
            if(!result) {
                return ClassifyInSequelize.create(classify)
                    .then(() => {
                        return "Catégorie ajoutée de cette recette"
                    })
                    .catch(err => {
                        throw new Error(err);
                    })
            } else {
                throw new Error("Cette catégorie est déjà associée à cette recette")
            }
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    
    deleteCategoryFromRecipe(classify: ClassifyIn): Promise<string> {
        return ClassifyInSequelize.findOne({
            where: {
                idRecette: classify.idRecette,
                idCategorie: classify.idCategorie
            }
        })
        .then((result) => {
            if(result) {
                return ClassifyInSequelize.destroy({
                    where: {
                        idRecette: classify.idRecette,
                        idCategorie: classify.idCategorie
                    }
                })
                    .then(() => {
                        return "Catégorie supprimée de cette recette"
                    })
                    .catch(err => {
                        throw new Error(err);
                    })
            } else {
                throw new Error("Cette catégorie n'est pas associée à cette recette")
            }
        })
        .catch(err => {
            throw new Error(err);
        })
        
    }
}