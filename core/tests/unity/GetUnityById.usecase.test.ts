import Unity from "../../domain/Unity";
import {BusinessException} from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import GetUnityByIdUseCase from "../../usecases/unity/GetUnityById.usecase";
import Token from "../../domain/Token";

const initUnity = (): Unity => {
  const unity = new Unity();
  unity.id = 1;
  unity.name = "g";

  return unity;
};

describe("get unity by id use case unit tests", () => {
  let getUnityByIdUseCase: GetUnityByIdUseCase;

  let unity: Unity;

  let user: Token = new Token();

  let unityRepository: UnityRepository = ({
    findById: null,
  } as unknown) as UnityRepository;

  beforeEach(() => {
    getUnityByIdUseCase = new GetUnityByIdUseCase(unityRepository);

    unity = initUnity();

    spyOn(unityRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: Unity = unity;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getUnityByIdUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getUnityByIdUseCase.execute(unity.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getUnityByIdUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getUnityByIdUseCase.execute(unity.id, undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getUnityByIdUseCase should return unity when id is 1", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Unity = await getUnityByIdUseCase.execute(
      unity.id,
      user
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("g");
  });

  it("should throw an error when id is missing", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getUnityByIdUseCase.execute(null, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'id d'une unité est obligatoire");
    }
  });
});
