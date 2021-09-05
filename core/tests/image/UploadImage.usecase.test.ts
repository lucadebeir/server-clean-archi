import { BusinessException } from "../../exceptions/BusinessException";
import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";
import UploadImageUseCase from "../../usecases/image/UploadImage.usecase";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";

const initImage = (): ImageDomain => {
  const image = new ImageDomain();
  image.name = "wraps aux épinards.jpeg";

  return image;
};

describe("upload image use case unit tests", () => {
  let uploadImageUseCase: UploadImageUseCase;

  let image: ImageDomain;
  let token: TokenDomain = new TokenDomain();

  let imageRepository: ImageRepository = ({
    uploadImage: null,
    checkExistByName: null
  } as unknown) as ImageRepository;

  beforeEach(() => {
    uploadImageUseCase = new UploadImageUseCase(imageRepository);

    image = initImage();

    spyOn(imageRepository, "uploadImage").and.callFake((file: any) => {
      if (file) {
        const result: ImageDomain = { ...image, id: 1, link: "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg"};
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("uploadImageUseCase should return image when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(imageRepository, "checkExistByName").and.returnValue(false);
    const result: ImageDomain = await uploadImageUseCase.execute(
      image,
      token
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("wraps aux épinards.jpeg");
    expect(result.link).toBe(
      "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg"
    );
  });

  it("uploadImageUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await uploadImageUseCase.execute(image, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("uploadImageUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await uploadImageUseCase.execute(image, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("uploadImageUseCase should throw an error when file is missing", async () => {
    try {
        spyOn(Utils, "isAdmin").and.returnValue(true);
      await uploadImageUseCase.execute(null, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Une image est obligatoire pour pouvoir la télécharger");
    }
  });

  it("uploadImageUseCase should throw an error when file alreaydy exists", async () => {
    try {
        spyOn(Utils, "isAdmin").and.returnValue(true);
        spyOn(imageRepository, "checkExistByName").and.returnValue(true);
      await uploadImageUseCase.execute(image, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image existe déjà");
    }
  });
});
