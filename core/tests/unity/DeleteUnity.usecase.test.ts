import Unity from "../../domain/Unity";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import DeleteUnityUseCase from "../../usecases/unity/DeleteUnity.usecase";

const initUnity = (): Unity => {
  const unity = new Unity();
  unity.idUnite = 1;
  unity.libelleUnite = "g";

  return unity;
};

describe("Update unity use case unit tests", () => {
  let deleteUnityUseCase: DeleteUnityUseCase;

  let unity: Unity;
  let user: User = new User();

  let unityRepository: UnityRepository = ({
    deleteById: null,
    findById: null,
    checkExistInRecipes: null,
    checkExistByName: null,
  } as unknown) as UnityRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    unity = initUnity();

    deleteUnityUseCase = new DeleteUnityUseCase(
      unityRepository,
      userRepository
    );

    spyOn(unityRepository, "deleteById").and.returnValue(
      "L'unité a bien été supprimé"
    );
  });

  it("deleteUnityUseCase should return unity when it succeeded", async () => {
    spyOn(unityRepository, "checkExistInRecipes").and.returnValue(false);
    spyOn(unityRepository, "checkExistByName").and.returnValue(false);
    spyOn(unityRepository, "findById").and.returnValue(true);
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: string = await deleteUnityUseCase.execute(
      unity.idUnite,
      user
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'unité a bien été supprimé");
  });

  it("deleteUnityUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await deleteUnityUseCase.execute(unity.idUnite, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteUnityUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await deleteUnityUseCase.execute(unity.idUnite, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteUnityUseCase should throw a parameter exception when the idUnity is null", async () => {
    unity.idUnite = null;
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await deleteUnityUseCase.execute(unity.idUnite, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "L'identifiant d'une unité est obligatoire pour pouvoir la supprimer"
      );
    }
  });

  it("deleteUnityUseCase should throw a parameter exception when the unity doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(false);
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await deleteUnityUseCase.execute(unity.idUnite, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette unité n'existe pas");
    }
  });

  it("deleteUnityUseCase should throw a parameter exception when the unity already exists in recipe(s)", async () => {
    try {
      spyOn(unityRepository, "checkExistInRecipes").and.returnValue(true);
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await deleteUnityUseCase.execute(unity.idUnite, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cette unité est associée à une ou plusieurs recettes"
      );
    }
  });
});
