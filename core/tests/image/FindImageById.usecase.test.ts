import { BusinessException } from "../../exceptions/BusinessException";
import ImageDomain from "../../domain/Image.domain";
import FindImageByIdUseCase from "../../usecases/image/FindImageById.usecase";
import ImageRepository from "../../ports/repositories/Image.repository";

const initImage = (): ImageDomain => {
  const image = new ImageDomain();
  image.id = 1;
  image.name = "wraps aux épinards.jpeg";
  image.link =
    "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg";

  return image;
};

describe("get image by id use case unit tests", () => {
  let findImageByIdUseCase: FindImageByIdUseCase;

  let image: ImageDomain;

  let imageRepository: ImageRepository = ({
    findById: null,
  } as unknown) as ImageRepository;

  beforeEach(() => {
    findImageByIdUseCase = new FindImageByIdUseCase(imageRepository);

    image = initImage();

    spyOn(imageRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: ImageDomain = image;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("findImageByIdUseCase should return image when id is 1", async () => {
    const result: ImageDomain = await findImageByIdUseCase.execute(
      image.id
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("wraps aux épinards.jpeg");
    expect(result.link).toBe(
      "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg"
    );
  });

  it("findImageByIdUseCase should throw an error when id is missing", async () => {
    try {
      await findImageByIdUseCase.execute(null);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une image est obligatoire");
    }
  });
});
