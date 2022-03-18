import {BusinessException} from "../../exceptions/BusinessException";
import Image from "../../domain/Image";
import ImageRepository from "../../ports/repositories/Image.repository";
import UploadImageUseCase from "../../usecases/image/UploadImage.usecase";
import Token from "../../domain/Token";
import * as Utils from "../../utils/token.service";

const initImage = (): Image => {
  const image = new Image();
  image.name = "wraps aux épinards.jpeg";

  return image;
};

describe("upload image use case unit tests", () => {
  let uploadImageUseCase: UploadImageUseCase;

  let image: Image;
  let token: Token = new Token();

  let imageRepository: ImageRepository = ({
    uploadImage: null,
    checkExistByName: null
  } as unknown) as ImageRepository;

  beforeEach(() => {
    uploadImageUseCase = new UploadImageUseCase(imageRepository);

    image = initImage();

    spyOn(imageRepository, "uploadImage").and.callFake((file: any) => {
      if (file) {
        const result: Image = { ...image, id: 1, link: "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg"};
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("uploadImageUseCase should return image when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(imageRepository, "checkExistByName").and.returnValue(false);
    const result: Image = await uploadImageUseCase.execute(
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("uploadImageUseCase should throw an error when file alreaydy exists", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(imageRepository, "checkExistByName").and.returnValue(true);
      await uploadImageUseCase.execute(image, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image existe déjà");
    }
  });
});
