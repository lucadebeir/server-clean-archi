import Category from "../../domain/Category.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import UpdateCategoryUseCase from "../../usecases/category/UpdateCategory.usecase";

const initCategory = (): Category => {
  const category = new Category();
  category.idCategorie = 1;
  category.libelleCategorie = "Douceur";

  return category;
};

describe("Update category use case unit tests", () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;

  let category: Category;
  let user: User = new User();

  let categoryRepository: CategoryRepository = ({
    update: null,
    checkExistByName: null,
  } as unknown) as CategoryRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    category = initCategory();

    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoryRepository,
      userRepository
    );

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
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: Category = await updateCategoryUseCase.execute(
      user,
      category
    );
    expect(result).toBeDefined();
    expect(result.idCategorie).toBeDefined();
    expect(result.libelleCategorie).toBe("Douceur");
  });

  it("updateCategoryUseCase should throw a parameter exception when the category is null", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await updateCategoryUseCase.execute(user, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La catégorie est indéfinie");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateCategoryUseCase.execute(undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the libelleCategorie is null", async () => {
    category.libelleCategorie = null;
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await updateCategoryUseCase.execute(user, category);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une catégorie est obligatoire");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the libelleCategorie exist in db", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "checkExistByName").and.returnValue(true);
      await updateCategoryUseCase.execute(user, category);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une catégorie");
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await updateCategoryUseCase.execute(user, category);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
