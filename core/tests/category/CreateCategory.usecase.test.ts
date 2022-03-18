import Category from "../../domain/Category";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import CreateCategoryUseCase from "../../usecases/category/CreateCategory.usecase";
import * as Utils from "../../utils/token.service";

const initCategory = (): Category => {
  const category = new Category();
  category.name = "Douceur";

  return category;
};

describe("Create category use case unit tests", () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  let category: Category;
  let user: Token = new Token();

  let categoryRepository: CategoryRepository = {
    create: null,
    checkExistByName: null
  } as unknown as CategoryRepository;

  beforeEach(() => {
    category = initCategory();

    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

    spyOn(categoryRepository, "create").and.callFake((category: Category) => {
      if (category) {
        const result: Category = { ...category, id: 1 };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createCategoryUseCase should return category when it succeeded", async () => {
    spyOn(categoryRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Category = await createCategoryUseCase.execute(
      category,
      user
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Douceur");
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await createCategoryUseCase.execute(category, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await createCategoryUseCase.execute(category, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the category is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(undefined, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La catégorie est indéfinie");
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the libelleCategorie is null", async () => {
    category.name = undefined;
    try {
      spyOn(categoryRepository, "checkExistByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(category, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une catégorie est obligatoire");
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the libelleCategorie already exists", async () => {
    try {
      spyOn(categoryRepository, "checkExistByName").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(category, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une catégorie");
    }
  });
});
