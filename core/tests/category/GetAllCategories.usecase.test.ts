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
  let user: TokenDomain = new TokenDomain();

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
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Category[] = await getAllCategoriesUseCase.execute(user);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getAllCategoriesUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllCategoriesUseCase.execute(user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
