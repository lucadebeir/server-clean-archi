import ImageDomain from "../../../../core/domain/Image.domain";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";

export default class ImageRepositorySQL implements ImageRepository {
  existById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  checkExistByName(name: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  uploadImage(file: any): Promise<ImageDomain> {
    throw new Error("Method not implemented.");
  }
  findById(id: any): Promise<ImageDomain> {
    return ImageSequelize.findOne({
      where: {
        idImage: id,
      },
    })
      .then((image: any) => {
        return image;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findByRecette(id: any): Promise<ImageDomain> {
    return ImageSequelize.findOne({
      include: [
        {
          model: RecipeSequelize,
          where: {
            idRecette: id,
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
        throw new Error(err);
      });
  }
}
