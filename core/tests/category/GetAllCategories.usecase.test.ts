import Category from "../../domain/Category.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import * as Utils from "../../utils/token.service";
import GetAllCategoriesUseCase from "../../usecases/category/GetAllCategories.usecase";
import TokenDomain from "../../domain/Token.domain";

const initCategories = (): Category[] => {
  const category1 = new Category();
  category1.idCategorie = 1;
  category1.libelleCategorie = "Douceur";

  const category2 = new Category();
  category2.idCategorie = 2;
  category2.libelleCategorie = "Repas";

  const list = [];

  list.push(category1);
  list.push(category2);

  return list;
};

describe("Get all categories use case unit tests", () => {
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;

  let list: Category[];

  let categoryRepository: CategoryRepository = ({
    findAll: null,
  } as unknown) as CategoryRepository;

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
