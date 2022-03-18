import Category from "../../domain/Category";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import * as Utils from "../../utils/token.service";
import UpdateCategoryUseCase from "../../usecases/category/UpdateCategory.usecase";
import Token from "../../domain/Token";

const initCategory = (): Category => {
  const category = new Category();
  category.id = 1;
  category.name = "Douceur";

  return category;
};

describe("Update category use case unit tests", () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;

  let category: Category;
  let user: Token = new Token();

  let categoryRepository: CategoryRepository = {
    update: null,
    checkExistByName: null,
    existById: null,
  } as unknown as CategoryRepository;

  beforeEach(() => {
    category = initCategory();

    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

    spyOn(categoryRepository, "update").and.callFake((category: Category) => {
      if (category) {
        const result: Category = { ...category };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateCategoryUseCase should return category when it succeeded", async () => {
    spyOn(categoryRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    const result: Category = await updateCategoryUseCase.execute(
      user,
      category
    );
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Douceur");
  });

  it("updateCategoryUseCase should throw a parameter exception when the category is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateCategoryUseCase.execute(user, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La catégorie est indéfinie");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateCategoryUseCase.execute(undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the idCategory is null", async () => {
    category.id = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateCategoryUseCase.execute(user, category);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "L'identifiant d'une catégorie est obligatoire pour pouvoir la modifier"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the category doesnt exist", async () => {
    category.id = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(false);
      await updateCategoryUseCase.execute(user, category);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "L'identifiant d'une catégorie est obligatoire pour pouvoir la modifier"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the libelleCategorie is null", async () => {
    category.name = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await updateCategoryUseCase.execute(user, category);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une catégorie est obligatoire");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the libelleCategorie exist in db", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "checkExistByName").and.returnValue(true);
      await updateCategoryUseCase.execute(user, category);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une catégorie");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateCategoryUseCase.execute(user, category);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
