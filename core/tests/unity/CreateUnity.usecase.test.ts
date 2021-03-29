import Unity from "../../domain/Unity";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import CreateUnityUseCase from "../../usecases/unity/CreateUnity.usecase";
import TokenDomain from "../../domain/Token.domain";

const initUnity = (): Unity => {
  const unity = new Unity();
  unity.libelleUnite = "g";

  return unity;
};

describe("Create unity use case unit tests", () => {
  let createUnityUseCase: CreateUnityUseCase;

  let unity: Unity;
  let user: TokenDomain = new TokenDomain();

  let unityRepository: UnityRepository = ({
    create: null,
    checkExistByName: null,
  } as unknown) as UnityRepository;

  beforeEach(() => {
    unity = initUnity();

    createUnityUseCase = new CreateUnityUseCase(unityRepository);

    spyOn(unityRepository, "create").and.callFake((unity: Unity) => {
      if (unity) {
        const result: Unity = { ...unity, idUnite: 1 };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createUnityUseCase should return unity when it succeeded", async () => {
    spyOn(unityRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Unity = await createUnityUseCase.execute(unity, user);
    expect(result).toBeDefined();
    expect(result.idUnite).toBe(1);
    expect(result.libelleUnite).toBe("g");
  });

  it("createUnityUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await createUnityUseCase.execute(unity, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createUnityUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await createUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createUnityUseCase should throw a parameter exception when the unity is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createUnityUseCase.execute(undefined, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'unité est indéfinie");
    }
  });

  it("createUnityUseCase should throw a parameter exception when the libelleUnity is null", async () => {
    unity.libelleUnite = null;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le libellé d'une unité est obligatoire");
    }
  });

  it("createUnityUseCase should throw a parameter exception when the libelleUnity has more than 19 characters", async () => {
    unity.libelleUnite = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(unityRepository, "checkExistByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le libellé d'une unité ne peut pas comporter plus de 19 caractères"
      );
    }
  });

  it("createUnityUseCase should throw a parameter exception when the libelleUnity already exists", async () => {
    try {
      spyOn(unityRepository, "checkExistByName").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createUnityUseCase.execute(unity, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce libellé est déjà utilisé par une unité");
    }
  });
});
