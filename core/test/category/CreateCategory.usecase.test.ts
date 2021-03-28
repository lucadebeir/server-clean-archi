import Category from "../../domain/Category.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import CreateCategoryUseCase from "../../usecases/category/CreateCategory.usecase";

const initCategory = (): Category => {
  const category = new Category();
  category.libelleCategorie = "Douceur";

  return category;
};

describe("Create category use case unit tests", () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  let category: Category;
  let user: User = new User();

  let categoryRepository: CategoryRepository = ({
    create: null,
    checkExistByName: null,
  } as unknown) as CategoryRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    category = initCategory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepository,
      userRepository
    );

    spyOn(categoryRepository, "create").and.callFake((category: Category) => {
      if (category) {
        const result: Category = { ...category, idCategorie: 1 };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createCategoryUseCase should return category when it succeeded", async () => {
    spyOn(categoryRepository, "checkExistByName").and.returnValue(false);
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: Category = await createCategoryUseCase.execute(
      category,
      user
    );
    expect(result).toBeDefined();
    expect(result.idCategorie).toBe(1);
    expect(result.libelleCategorie).toBe("Douceur");
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await createCategoryUseCase.execute(category, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await createCategoryUseCase.execute(category, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the category is null", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(undefined, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La catégorie est indéfinie");
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the libelleCategorie is null", async () => {
    category.libelleCategorie = null;
    try {
      spyOn(categoryRepository, "checkExistByName").and.returnValue(false);
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(category, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une catégorie est obligatoire");
    }
  });

  it("createCategoryUseCase should throw a parameter exception when the libelleCategorie already exists", async () => {
    try {
      spyOn(categoryRepository, "checkExistByName").and.returnValue(true);
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await createCategoryUseCase.execute(category, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une catégorie");
    }
  });
});
