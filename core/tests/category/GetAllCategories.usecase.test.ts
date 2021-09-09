import Category from "../../domain/Category.domain";
import CategoryRepository from "../../ports/repositories/Category.repository";
import GetAllCategoriesUseCase from "../../usecases/category/GetAllCategories.usecase";

const initCategories = (): Category[] => {
  const category1 = new Category();
  category1.id = 1;
  category1.name = "Douceur";

  const category2 = new Category();
  category2.id = 2;
  category2.name = "Repas";

  const list = [];

  list.push(category1);
  list.push(category2);

  return list;
};

describe("Get all categories use case unit tests", () => {
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;

  let list: Category[];

  let categoryRepository: CategoryRepository = {
    findAll: null,
  } as unknown as CategoryRepository;

  beforeEach(() => {
    list = initCategories();

    getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

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
