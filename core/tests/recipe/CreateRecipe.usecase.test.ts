import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import date from "date-and-time";
import UseIngredient from "../../domain/UseIngredient";
import Image from "../../domain/Image";
import ClassifyIn from "../../domain/ClassifyIn";
import CreateRecipeUseCase from "../../usecases/recipe/CreateRecipe.usecase";
import Category from "../../domain/Category";
import Ingredient from "../../domain/Ingredient";
import Unity from "../../domain/Unity";
import UserRepository from "../../ports/repositories/User.repository";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import Step from "../../domain/Step";
import IllustrateRecipe from "../../domain/IllustrateRecipe";

const initRecipe = (): Recipe => {
    const recipe = new Recipe();
    recipe.name = "Lasagnes";
    recipe.steps = initSteps();
    recipe.number_portion = 1;
    recipe.name_portion = "Bocal";
    recipe.preparation_time = date.format(new Date("00:08:00"), "hh:mm:ss");
    recipe.rest_time = date.format(new Date("00:08:00"), "hh:mm:ss");
    recipe.astuce =
        "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
    recipe.mot =
        "Un granola qui conviendra parfaitement aux fan de BANANA bread !";

    return recipe;
};

const initSteps = (): Step[] => {
    const step = new Step();
    step.indication = "Préchauffer le four à 180°C.";
    step.number = 1;
    step.id_recipe = 1;

    return [step];
};

const afterCreateRecipe = (): Recipe => {
    const recipe = new Recipe();
    recipe.id = 1;
    recipe.name = "Lasagnes";
    recipe.steps = initSteps();
    recipe.number_portion = 1;
    recipe.name_portion = "Bocal";
    recipe.preparation_time = date.format(new Date("00:08:00"), "hh:mm:ss");
    recipe.rest_time = date.format(new Date("00:08:00"), "hh:mm:ss");
    recipe.astuce =
        "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
    recipe.mot =
        "Un granola qui conviendra parfaitement aux fan de BANANA bread !";
    recipe.number_views = 0;
    recipe.number_favorites = 0;
    recipe.date = new Date("01/04/2021");

    recipe.categories = initCategory();

    const useIngredient = new UseIngredient();
    useIngredient.ingredient = new Ingredient();
    useIngredient.ingredient.id = 1;
    useIngredient.ingredient.name = "Bolo";
    useIngredient.unite = new Unity();
    useIngredient.unite.id = 1;
    useIngredient.unite.name = "g";
    useIngredient.quantity = 1;

    recipe.recipes__ingredients__units = [useIngredient];

    const image = new Image();
    image.id = 1;
    image.link =
        "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
    image.name = "IMG_20200903_103750_461311495694712.jpg";

    const illustrateRecipe = new IllustrateRecipe();
    illustrateRecipe.image = image;
    recipe.recipes__images = [illustrateRecipe];

    return recipe;
};

const initClassifyIn = (): ClassifyIn[] => {
    const category = new ClassifyIn();
    category.id_category = 1;

    return [category];
};

const initCategory = (): Category[] => {
    const category = new Category();
    category.id = 1;
    category.name = "Douceur";

    return [category];
};

const initUseIngredient = (): UseIngredient[] => {
    const useIngredient = new UseIngredient();
    useIngredient.id_ingredient = 1;
    useIngredient.id_unit = 1;
    useIngredient.quantity = 1;

    return [useIngredient];
};

const initImage = (): IllustrateRecipe[] => {
    const illustrateRecipe = new IllustrateRecipe();
    const image = new Image();
    image.link =
        "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
    image.name = "IMG_20200903_103750_461311495694712.jpg";

    illustrateRecipe.image = image;
    return [illustrateRecipe];
};

describe("Create recipe use case unit tests", () => {
    let createRecipeUseCase: CreateRecipeUseCase;

    let recipe: Recipe;
    let classifyIn: ClassifyIn[];
    let useIngredient: UseIngredient[];
    let illustrateRecipe: IllustrateRecipe[];
    let user: Token = new Token();

    let recipeRepository: RecipeRepository = {
        create: null,
        existByName: null,
    } as unknown as RecipeRepository;

    let userRepository: UserRepository = {
        findAllAbonneMailUsers: null
    } as unknown as UserRepository;

    let mailingRepository: MailingRepository = {
        sendMailWhenNewRecipe: null
    } as unknown as MailingRepository;

    beforeEach(() => {
        recipe = initRecipe();
        classifyIn = initClassifyIn();
        useIngredient = initUseIngredient();
        illustrateRecipe = initImage();

        recipe.recipes__categories = classifyIn;
        recipe.recipes__ingredients__units = useIngredient;
        recipe.recipes__images = illustrateRecipe;

        createRecipeUseCase = new CreateRecipeUseCase(
            recipeRepository,
            mailingRepository,
            userRepository
        );

        spyOn(recipeRepository, "create").and.callFake((recipe: Recipe) => {
            if (recipe) {
                const result: Recipe = afterCreateRecipe();
                return new Promise((resolve, reject) => resolve(result));
            }
            return new Promise((resolve, reject) => resolve(null));
        });

        spyOn(userRepository, "findAllAbonneMailUsers").and.returnValue([user]);
        spyOn(mailingRepository, "sendMailWhenNewRecipe");
    });

    it("createRecipeUseCase should return message when it succeeded", async () => {
        spyOn(Utils, "isAdmin").and.returnValue(true);
        spyOn(recipeRepository, "existByName").and.returnValue(false);
        const result: Recipe = await createRecipeUseCase.execute(recipe, user);
        expect(result).toBeDefined();
        expect(result.id).toStrictEqual(1);
        expect(result.name).toStrictEqual("Lasagnes");
        expect(result.steps).toHaveLength(1);
        expect(result.number_portion).toStrictEqual(1);
        expect(result.number_views).toStrictEqual(0);
        expect(result.number_favorites).toStrictEqual(0);
        expect(result.date).toStrictEqual(new Date("01/04/2021"));
        expect(result.name_portion).toStrictEqual("Bocal");
        expect(result.preparation_time).toStrictEqual(date.format(new Date("00:08:00"), "hh:mm:ss"));
        expect(result.rest_time).toStrictEqual(date.format(new Date("00:08:00"), "hh:mm:ss"));
        expect(result.astuce).toStrictEqual("* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).");
        expect(result.mot).toStrictEqual("Un granola qui conviendra parfaitement aux fan de BANANA bread !");
        expect(result.categories).toBeDefined();
        expect(result.categories?.length).toStrictEqual(1);
        expect(result.recipes__ingredients__units).toBeDefined();
        expect(result.recipes__ingredients__units?.length).toStrictEqual(1);
        expect(result.recipes__images).toBeDefined();
        expect(result.recipes__images?.length).toStrictEqual(1);
        expect(result.recipes__images?.map((illustrateRecipe) => expect(illustrateRecipe?.image?.id).toBeDefined()));
    });

    it("createRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
        try {
            spyOn(Utils, "isAdmin").and.returnValues(false);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: TechnicalException = e;
            expect(a.message).toBe(
                "Vous n'avez pas le droit d'accéder à cette ressource"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the name of recipe is already used", async () => {
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(true);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe("La recette " + recipe.name + " existe déjà.");
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the name of recipe is not defined", async () => {
        recipe.name = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le champ name d'une recette est obligatoire"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the name_portion of recipe is not defined", async () => {
        recipe.name_portion = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le champ name_portion d'une recette est obligatoire"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the number_portion of recipe is not defined", async () => {
        recipe.number_portion = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe("Le champ number_portion d'une recette est obligatoire");
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the preparation_time of recipe is not defined", async () => {
        recipe.preparation_time = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le champ preparation_time d'une recette est obligatoire"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the length of the name is greater than 60 caracters", async () => {
        recipe.name =
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le champ name d'une recette ne doit pas dépasser 60 caractères"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the length of the name_portion is greater than 50 caracters", async () => {
        recipe.name_portion =
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le champ name_portion d'une recette ne doit pas dépasser 50 caractères"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the number_portion is less than 0", async () => {
        recipe.number_portion = -2;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le nombre de part doit être strictement supérieur à 0"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when the number_portion is equal to 0", async () => {
        recipe.number_portion = 0;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Le nombre de part doit être strictement supérieur à 0"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity negative", async () => {
        useIngredient[0].quantity = -2;
        recipe.recipes__ingredients__units = useIngredient;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity null", async () => {
        useIngredient[0].quantity = 0;
        recipe.recipes__ingredients__units = useIngredient;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when useIngredients is empty", async () => {
        recipe.recipes__ingredients__units = [];
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins un ingrédient pour créer une recette"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when useIngredients is undefined", async () => {
        recipe.recipes__ingredients__units = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins un ingrédient pour créer une recette"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when recipes__categories is empty", async () => {
        recipe.recipes__categories = [];
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins une catégorie pour créer une recette"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when recipes__categories is undefined", async () => {
        recipe.recipes__categories = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins une catégorie pour créer une recette"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when images is empty", async () => {
        recipe.recipes__images = [];
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins une image pour créer une recette"
            );
        }
    });

    it("createRecipeUseCase should throw a parameter exception when images is undefined", async () => {
        recipe.recipes__images = undefined;
        try {
            spyOn(recipeRepository, "existByName").and.returnValue(false);
            spyOn(Utils, "isAdmin").and.returnValue(true);
            await createRecipeUseCase.execute(recipe, user);
        } catch (e: any) {
            const a: BusinessException = e;
            expect(a.message).toBe(
                "Il faut sélectionner au moins une image pour créer une recette"
            );
        }
    });
});
