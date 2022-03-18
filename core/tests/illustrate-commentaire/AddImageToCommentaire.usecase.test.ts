import {BusinessException} from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import AddImageToCommentaireUseCase from "../../usecases/illustrate-commentaire/AddImageToCommentaire.usecase";
import IllustrateCommentaire from "../../domain/IllustrateCommentaire";
import IllustratecommentaireRepository from "../../ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../ports/repositories/Image.repository";

const initIllustrateCommentaire = (): IllustrateCommentaire => {
  const illustrateCommentaire = new IllustrateCommentaire();
  illustrateCommentaire.id_commentaire = 1;
  illustrateCommentaire.id_image = 1;

  return illustrateCommentaire;
};

describe("Add image to commentaire use case unit tests", () => {
  let addImageToCommentaireUseCase: AddImageToCommentaireUseCase;

  let illustrateCommentaire: IllustrateCommentaire;
  let token: Token = new Token();

  let illustrateCommentaireRepository: IllustratecommentaireRepository = ({
    addToCommentaire: null,
    check: null,
  } as unknown) as IllustratecommentaireRepository;

  let imageRepository: ImageRepository = ({
    existById: null,
  } as unknown) as ImageRepository;

  let commentaireRepository: CommentaireRepository = ({
    existById: null,
  } as unknown) as CommentaireRepository;

  beforeEach(() => {
    illustrateCommentaire = initIllustrateCommentaire();

    addImageToCommentaireUseCase = new AddImageToCommentaireUseCase(
      illustrateCommentaireRepository,
      imageRepository,
      commentaireRepository
    );

    spyOn(illustrateCommentaireRepository, "addToCommentaire").and.callFake(
      (illustrateCommentaire: IllustrateCommentaire) => {
        if (illustrateCommentaire) {
          const result: string = "L'image a bien été ajouté à la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addImageToCommentaireUseCase should return string when it succeeded", async () => {
    spyOn(imageRepository, "existById").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(illustrateCommentaireRepository, "check").and.returnValue(false);
    const result: string = await addImageToCommentaireUseCase.execute(
      illustrateCommentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'image a bien été ajouté à la recette");
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await addImageToCommentaireUseCase.execute(
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

  it("addImageToCommentaireUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when the idImage is undefined", async () => {
    illustrateCommentaire.id_image = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when the idCommentaire is undefined", async () => {
    illustrateCommentaire.id_commentaire = undefined;
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire doit exister");
    }
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when the image doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when the commentaire doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire doit exister");
    }
  });

  it("addImageToCommentaireUseCase should throw a parameter exception when image already exist on this commentaire", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(illustrateCommentaireRepository, "check").and.returnValue(true);
      await addImageToCommentaireUseCase.execute(illustrateCommentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image est déjà associé à ce commentaire");
    }
  });
});
