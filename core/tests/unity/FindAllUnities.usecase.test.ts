import Unity from "../../domain/Unity";
import {BusinessException} from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import FindAllUnitiesUsecase from "../../usecases/unity/FindAllUnities.usecase";
import Token from "../../domain/Token";

const initUnities = (): Unity[] => {
  const unity1 = new Unity();
  unity1.id = 1;
  unity1.name = "cl";

  const unity2 = new Unity();
  unity2.id = 2;
  unity2.name = "g";

  return [unity1, unity2];
};

describe("Get all unities use case unit tests", () => {
  let getAllUnitiesUseCase: FindAllUnitiesUsecase;

  let list: Unity[];
  let user: Token = new Token();

  let unityRepository: UnityRepository = {
    findAll: null,
  } as unknown as UnityRepository;

  beforeEach(() => {
    list = initUnities();

    getAllUnitiesUseCase = new FindAllUnitiesUsecase(unityRepository);

    spyOn(unityRepository, "findAll").and.callFake(() => {
      const result: Unity[] = list;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllUnitiesUseCase should return unities when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Unity[] = await getAllUnitiesUseCase.execute(user);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getAllUnitiesUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getAllUnitiesUseCase.execute(user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
