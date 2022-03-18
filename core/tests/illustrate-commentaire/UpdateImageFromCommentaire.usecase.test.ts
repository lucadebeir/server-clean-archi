import {BusinessException} from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import IllustrateCommentaire from "../../domain/IllustrateCommentaire";
import IllustrateCommentaireRepository from "../../ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import UpdateImageFromCommentaireUseCase
    from "../../usecases/illustrate-commentaire/UpdateImageFromCommentaire.usecase";

const initIllustrateCommentaire = (): IllustrateCommentaire => {
  const illustrateCommentaire = new IllustrateCommentaire();
  illustrateCommentaire.id_commentaire = 1;
  illustrateCommentaire.id_image = 1;

  return illustrateCommentaire;
};

describe("Add image to commentaire use case unit tests", () => {
  let updateImageFromCommentaireUseCase: UpdateImageFromCommentaireUseCase;

  let illustrateCommentaire: IllustrateCommentaire;
  let token: Token = new Token();

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
    ).and.callFake((illustrateCommentaire: IllustrateCommentaire) => {
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the idImage is undefined", async () => {
    illustrateCommentaire.id_image = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("updateImageFromCommentaireUseCase should throw a parameter exception when the idCommentaire is undefined", async () => {
    illustrateCommentaire.id_commentaire = undefined;
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromCommentaireUseCase.execute(
        illustrateCommentaire,
        token
      );
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image n'existe pas dans ce commentaire");
    }
  });
});
