import Image from "../../../../core/domain/Image";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class ImageRepositorySQL implements ImageRepository {

    existById(id: any): Promise<boolean> {
        return ImageSequelize.findOne({
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

    deleteById(id: any): Promise<string> {
        return ImageSequelize.destroy({
            where: {
                id: id,
            },
        })
            .then(() => {
                return "Cette image a bien été supprimé";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    checkExistByName(name: any): Promise<boolean> {
        return ImageSequelize.findOne({
            where: {
                name: name,
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    uploadImage(image: Image): Promise<Image> {
        return ImageSequelize.findOne({
            where: {
                name: image.name
            }
        }).then((result: any) => {
            if (result) return result;
            return ImageSequelize.create(image)
                .then((result: Image) => result)
                .catch(err => {
                    throw new TechnicalException(err.message)
                });
        })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });

    }

    findById(id: any): Promise<Image> {
        return ImageSequelize.findOne({
            where: {
                id: id,
            },
        })
            .then((image: any) => {
                return image;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findByRecipe(id: any): Promise<Image> {
        return ImageSequelize.findOne({
            include: [
                {
                    model: RecipeSequelize,
                    where: {
                        id: id,
                    },
                    through: {
                        attributes: [],
                    },
                },
            ],
        })
            .then((image: any) => {
                return image;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
