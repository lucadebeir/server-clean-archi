import Unity from "../../../../core/domain/Unity";
import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import RecipeSequelize from "../entities/Recipe.model";
import UnitySequelize from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";

export default class UnityRepositorySQL implements UnityRepository {
  existById(id: any): Promise<boolean> {
    return UnitySequelize.findOne({
      where: {
        idUnite: id,
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

  create(unityToCreate: Unity): Promise<Unity> {
    return UnitySequelize.findOne({
      where: {
        libelleUnite: unityToCreate.libelleUnite,
      },
    })
      .then((unity) => {
        if (!unity) {
          return UnitySequelize.create(unityToCreate)
            .then((unityCreate) => {
              if (unityCreate) {
                return unityCreate;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet unité existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAll(): Promise<Unity[]> {
    return UnitySequelize.findAll({
      order: [["libelleUnite", "ASC"]],
    })
      .then((unity) => {
        if (unity) {
          return unity;
        } else {
          throw new Error("Il n'y a pas d'unité !");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(id: any): Promise<Unity> {
    return UnitySequelize.findOne({
      where: {
        idUnite: id,
      },
    })
      .then((unity) => {
        if (unity) {
          return unity;
        } else {
          throw new Error("Il n'y a pas d'unité avec cet identifiant!");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  deleteById(id: any): Promise<string> {
    return UnitySequelize.destroy({
      where: {
        idUnite: id,
      },
    })
      .then(() => {
        return "Unite deleted!";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(unityToUpdate: Unity): Promise<Unity> {
    return UnitySequelize.findOne({
      where: {
        libelleUnite: unityToUpdate.libelleUnite,
      },
    })
      .then((unity) => {
        if (!unity) {
          return UnitySequelize.update(
            { libelleUnite: unityToUpdate.libelleUnite },
            { where: { idUnite: unityToUpdate.idUnite } }
          )
            .then(() => {
              return unityToUpdate;
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet unité existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkExistByName(name: any): Promise<boolean> {
    return UnitySequelize.findOne({
      where: {
        libelleUnite: name,
      },
    })
      .then((unity) => {
        if (unity) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkExistInRecipes(id: any): Promise<boolean> {
    return UseIngredientSequelize.findOne({
      where: {
        idUnite: id,
      },
    })
      .then((unity) => {
        if (unity) {
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
