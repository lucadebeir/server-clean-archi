import Category from "../../domain/Category.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import DeleteCategoryUseCase from "../../usecases/category/DeleteCategory.usecase";
import * as Utils from "../../utils/token.service";

const initCategory = (): Category => {
  const category = new Category();
  category.idCategorie = 1;
  category.libelleCategorie = "Douceur";

  return category;
};

describe("Delete category use case unit tests", () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  let category: Category;
  let user: TokenDomain = new TokenDomain();

  let categoryRepository: CategoryRepository = ({
    deleteById: null,
    checkExistInRecipes: null,
    existById: null,
  } as unknown) as CategoryRepository;

  beforeEach(() => {
    category = initCategory();

    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

    spyOn(categoryRepository, "deleteById").and.returnValue(
      "La catégorie a bien été supprimé"
    );
  });

  it("deleteCategoryUseCase should return category when it succeeded", async () => {
    spyOn(categoryRepository, "checkExistInRecipes").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    const result: string = await deleteCategoryUseCase.execute(
      category.idCategorie,
      user
    );
    expect(result).toBeDefined();
    expect(result).toBe("La catégorie a bien été supprimé");
  });

  it("deleteCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await deleteCategoryUseCase.execute(undefined, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteCategoryUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(true);
      await deleteCategoryUseCase.execute(undefined, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une catégorie est indéfinie");
    }
  });

  it("deleteCategoryUseCase should throw a parameter exception when the category doesn't exist", async () => {
    try {
      spyOn(categoryRepository, "checkExistInRecipes").and.returnValue(false);
      spyOn(categoryRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryUseCase.execute(category.idCategorie, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette catégorie n'existe pas");
    }
  });

  it("deleteCategoryUseCase should throw a parameter exception when the category is used in a recipe", async () => {
    try {
      spyOn(categoryRepository, "checkExistInRecipes").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryUseCase.execute(category.idCategorie, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cette catégorie est associée à une ou plusieurs recettes"
      );
    }
  });
});
