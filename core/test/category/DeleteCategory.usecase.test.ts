import Category from "../../domain/Category.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import DeleteCategoryUseCase from "../../usecases/category/DeleteCategory.usecase";

const initCategory = (): Category => {
  const category = new Category();
  category.idCategorie = 1;
  category.libelleCategorie = "Douceur";

  return category;
};

describe("Delete category use case unit tests", () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  let category: Category;
  var alreadyCalled = true;

  let categoryRepository: CategoryRepository = ({
    deleteById: null,
    checkExistInRecipes: null,
  } as unknown) as CategoryRepository;

  beforeEach(() => {
    category = initCategory();

    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

    spyOn(categoryRepository, "deleteById").and.returnValue(true);
    spyOn(categoryRepository, "checkExistInRecipes").and.callFake(function () {
      if (alreadyCalled) return false;
      alreadyCalled = true;
      return true;
    });
  });

  it("deleteCategoryUseCase should return category when it succeeded", async () => {
    const result: string = await deleteCategoryUseCase.execute(
      category.idCategorie
    );
    expect(result).toBeDefined();
  });

  it("deleteCategoryUseCase should throw a parameter exception when the id is null", async () => {
    try {
      await deleteCategoryUseCase.execute(undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une catégorie est indéfinie");
    }
  });

  it("deleteCategoryUseCase should throw a parameter exception when the category is used in a recipe", async () => {
    try {
      await deleteCategoryUseCase.execute(category);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cette catégorie est associée à une ou plusieurs recettes"
      );
    }
  });
});
