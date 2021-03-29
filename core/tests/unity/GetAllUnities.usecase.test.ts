import Category from "../../domain/Category.domain";
import Unity from "../../domain/Unity";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import GetAllCategoriesUseCase from "../../usecases/category/GetAllCategories.usecase";
import GetAllUnitiesUseCase from "../../usecases/unity/GetAllUnities.usecase";

const initUnities = (): Unity[] => {
  const unity1 = new Unity();
  unity1.idUnite = 1;
  unity1.libelleUnite = "cl";

  const unity2 = new Unity();
  unity2.idUnite = 2;
  unity2.libelleUnite = "g";

  const list = [];

  list.push(unity1);
  list.push(unity2);

  return list;
};

describe("Get all unities use case unit tests", () => {
  let getAllUnitiesUseCase: GetAllUnitiesUseCase;

  let list: Unity[];
  let user: User = new User();

  let unityRepository: UnityRepository = ({
    findAll: null,
  } as unknown) as UnityRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    list = initUnities();

    getAllUnitiesUseCase = new GetAllUnitiesUseCase(
      unityRepository,
      userRepository
    );

    spyOn(unityRepository, "findAll").and.callFake(() => {
      const result: Unity[] = list;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllUnitiesUseCase should return unities when it succeeded", async () => {
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: Unity[] = await getAllUnitiesUseCase.execute(user);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getAllUnitiesUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await getAllUnitiesUseCase.execute(user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
