import ImageDomain from "../../../../core/domain/Image.domain";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";

export default class ImageRepositorySQL implements ImageRepository {
  existById(id: any): Promise<boolean> {
    return ImageSequelize.findOne({
      where: {
        idImage: id,
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

  deleteById(id: any): Promise<string> {
    return ImageSequelize.destroy({
      where: {
        idImage: id,
      },
    })
      .then(() => {
        return "Cette image a bien été supprimé";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkExistByName(name: any): Promise<boolean> {
    return ImageSequelize.findOne({
      where: {
        nameImage: name,
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
