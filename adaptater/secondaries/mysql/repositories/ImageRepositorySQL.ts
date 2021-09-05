import ImageDomain from "../../../../core/domain/Image.domain";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";

export default class ImageRepositorySQL implements ImageRepository {
  existById(id: any): Promise<boolean> {
    return ImageSequelize.findOne({
      where: {
        id: id,
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
        id: id,
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
        name: name,
      },
    })
      .then((result: any) => {
        console.log(result);

        if (result) {
          console.log("here");
          return true;
        } else {
          console.log("here1");
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  uploadImage(image: ImageDomain): Promise<ImageDomain> {
    return ImageSequelize.create(image)
      .then((result: ImageDomain) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(id: any): Promise<ImageDomain> {
    return ImageSequelize.findOne({
      where: {
        id: id,
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
        throw new Error(err);
      });
  }
}
