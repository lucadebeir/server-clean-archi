import Category from "../../domain/Category";
import CategoryRepository from "../../ports/repositories/Category.repository";
import FindAllCategoriesUsecase from "../../usecases/category/FindAllCategories.usecase";

const initCategories = (): Category[] => {
  const category1 = new Category();
  category1.id = 1;
  category1.name = "Douceur";

  const category2 = new Category();
  category2.id = 2;
  category2.name = "Repas";

  return [category1, category2];
};

describe("Get all categories use case unit tests", () => {
  let getAllCategoriesUseCase: FindAllCategoriesUsecase;

  let list: Category[];

  let categoryRepository: CategoryRepository = {
    findAll: null,
  } as unknown as CategoryRepository;

  beforeEach(() => {
    list = initCategories();

    getAllCategoriesUseCase = new FindAllCategoriesUsecase(categoryRepository);

    spyOn(categoryRepository, "findAll").and.callFake(() => {
      const result: Category[] = list;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllCategoriesUseCase should return categories when it succeeded", async () => {
    const result: Category[] = await getAllCategoriesUseCase.execute();
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });
});
