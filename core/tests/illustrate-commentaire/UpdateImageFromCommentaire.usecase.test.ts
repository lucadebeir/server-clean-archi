import { BusinessException } from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import IllustrateCommentaireDomain from "../../domain/IllustrateCommentaire.domain";
import IllustrateCommentaireRepository from "../../ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import UpdateImageFromCommentaireUseCase from "../../usecases/illustrate-commentaire/UpdateImageFromCommentaire.usecase";

const initIllustrateCommentaire = (): IllustrateCommentaireDomain => {
  const illustrateCommentaire = new IllustrateCommentaireDomain();
  illustrateCommentaire.idCommentaire = 1;
  illustrateCommentaire.idImage = 1;

  return illustrateCommentaire;
};

describe("Add image to commentaire use case unit tests", () => {
  let updateImageFromCommentaireUseCase: UpdateImageFromCommentaireUseCase;

  let illustrateCommentaire: IllustrateCommentaireDomain;
  let token: TokenDomain = new TokenDomain();

  let illustrateCommentaireRepository: IllustrateCommentaireRepository = ({
    updateFromCommentaire: null,
    check: null,
  } as unknown) as IllustrateCommentaireRepository;

  let imageRepository: ImageRepository = ({
    existById: null,
  } as unknown) as ImageRepository;

  let commentaireRepository: CommentaireRepository = ({
    existById: null,
  } as unknown) as CommentaireRepository;

  beforeEach(() => {
    illustrateCommentaire = initIllustrateCommentaire();

    updateImageFromCommentaireUseCase = new UpdateImageFromCommentaireUseCase(
      illustrateCommentaireRepository,
      imageRepository,
      commentaireRepository
    );

    spyOn(
      illustrateCommentaireRepository,
      "updateFromCommentaire"
    ).and.callFake((illustrateCommentaire: IllustrateCommentaireDomain) => {
      if (illustrateCommentaire) {
        const result: string = "L'image a bien remplacé dans la recette";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateImageFromCommentaireUseCase should return string when it succeeded", async () => {
    spyOn(imageRepository, "existById").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(illustrateCommentaireRepository, "check").and.returnValue(true);
    const result: string = await updateImageFromCommentaireUseCase.execute(
      illustrateCommentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'image a bien remplacé dans la recette");
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        undefined
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the idImage is undefined", async () => {
    illustrateCommentaire.idImage = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the idCommentaire is undefined", async () => {
    illustrateCommentaire.idCommentaire = undefined;
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire doit exister");
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the image doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the commentaire doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire doit exister");
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when association doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(illustrateCommentaireRepository, "check").and.returnValue(false);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image n'existe pas dans ce commentaire");
    }
  });
});
