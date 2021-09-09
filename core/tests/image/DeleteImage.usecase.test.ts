import { BusinessException } from "../../exceptions/BusinessException";
import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import DeleteImageUseCase from "../../usecases/image/DeleteImage.usecase";

const initImage = (): ImageDomain => {
  const image = new ImageDomain();
  image.id = 1;
  image.name = "wraps aux épinards.jpeg";
  image.link =
    "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg";

  return image;
};

describe("delete image by id use case unit tests", () => {
  let deleteImageUseCase: DeleteImageUseCase;

  let image: ImageDomain;
  let token: TokenDomain = new TokenDomain();

  let imageRepository: ImageRepository = ({
    deleteById: null,
    findById: null
  } as unknown) as ImageRepository;

  beforeEach(() => {
    deleteImageUseCase = new DeleteImageUseCase(imageRepository);

    image = initImage();

    spyOn(imageRepository, "deleteById").and.callFake((id: any) => {
      if (id) {
        const result: string = "Cette image a bien été supprimé";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteImageUseCase should return string when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(imageRepository, "findById").and.returnValue(true);
    const result: string = await deleteImageUseCase.execute(
      image.id,
      token
    );
    expect(result).toBe("Cette image a bien été supprimé");
  });

  it("deleteImageUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await deleteImageUseCase.execute(image.id, undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteImageUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await deleteImageUseCase.execute(image.id, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteImageUseCase should throw an error when id is missing", async () => {
    try {
        spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteImageUseCase.execute(null, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une image est obligatoire pour pouvoir la supprimer");
    }
  });

  it("deleteImageUseCase should throw an error when file doesn't exist", async () => {
    try {
        spyOn(Utils, "isAdmin").and.returnValue(true);
        spyOn(imageRepository, "findById").and.returnValue(false);
      await deleteImageUseCase.execute(image, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image n'existe pas");
    }
  });
});
