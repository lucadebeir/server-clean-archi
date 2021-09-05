import Unity from "../../domain/Unity";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import UpdateUnityUseCase from "../../usecases/unity/UpdateUnity.usecase";
import TokenDomain from "../../domain/Token.domain";

const initUnity = (): Unity => {
  const unity = new Unity();
  unity.id = 1;
  unity.name = "g";

  return unity;
};

describe("Update unity use case unit tests", () => {
  let updateUnityUseCase: UpdateUnityUseCase;

  let unity: Unity;
  let user: TokenDomain = new TokenDomain();

  let unityRepository: UnityRepository = ({
    update: null,
    checkExistByName: null,
    findById: null,
  } as unknown) as UnityRepository;

  beforeEach(() => {
    unity = initUnity();

    updateUnityUseCase = new UpdateUnityUseCase(unityRepository);

    spyOn(unityRepository, "update").and.callFake((unity: Unity) => {
      if (unity) {
        const result: Unity = { ...unity };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateUnityUseCase should return unity when it succeeded", async () => {
    spyOn(unityRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(unityRepository, "findById").and.returnValue(true);
    const result: Unity = await updateUnityUseCase.execute(unity, user);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("g");
  });

  it("updateUnityUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateUnityUseCase.execute(unity, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the unity is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(undefined, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'unité est indéfinie");
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the idUnity is null", async () => {
    unity.id = null;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "L'identifiant d'une unité est obligatoire pour pouvoir la modifier"
      );
    }
  });

  it("deleteUnityUseCase should throw a parameter exception when the unity doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette unité n'existe pas");
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the libelleUnity is null", async () => {
    unity.name = null;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une unité est obligatoire");
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the libelleUnity has more than 19 characters", async () => {
    unity.name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(unityRepository, "checkExistByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Une unité ne peut pas comporter plus de 19 caractères"
      );
    }
  });

  it("updateUnityUseCase should throw a parameter exception when the libelleUnity already exists", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(unityRepository, "checkExistByName").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une unité");
    }
  });
});
