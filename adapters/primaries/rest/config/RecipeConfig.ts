import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateRecipeUseCase from "../../../../core/usecases/recipe/CreateRecipe.usecase";
import DeleteRecipeUseCase from "../../../../core/usecases/recipe/DeleteRecipe.usecase";
import FindAllPerToNbViewUsecase from "../../../../core/usecases/recipe/FindAllPerToNbView.usecase";
import FindAllRecipesUsecase from "../../../../core/usecases/recipe/FindAllRecipes.usecase";
import FindCategoriesByIdRecipeUsecase from "../../../../core/usecases/recipe/FindCategoriesByIdRecipe.usecase";
import FindIngredientsByIdRecipeUsecase from "../../../../core/usecases/recipe/FindIngredientsByIdRecipe.usecase";
import FindLatestRecipesUsecase from "../../../../core/usecases/recipe/FindLatestRecipes.usecase";
import FindMostPopularRecipesUsecase from "../../../../core/usecases/recipe/FindMostPopularRecipes.usecase";
import FindRecipeByIdUsecase from "../../../../core/usecases/recipe/FindRecipeById.usecase";
import ResearchFilterUseCase from "../../../../core/usecases/recipe/ResearchFilter.usecase";
import UpdateNbViewsUseCase from "../../../../core/usecases/recipe/UpdateNbViews.usecase";
import UpdateRecipeUseCase from "../../../../core/usecases/recipe/UpdateRecipe.usecase";
import MailingRepositoryGmail from "../../../secondaries/mail/implementations/MailingRepositoryGmail";
import FavoriRepositorySQL from "../../../secondaries/mysql/repositories/FavoriRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";
import StepRepository from "../../../../core/ports/repositories/Step.repository";
import StepRepositorySQL from "../../../secondaries/mysql/repositories/StepRepositorySQL";
import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import UseIngredientRepositorySQL from "../../../secondaries/mysql/repositories/UseIngredientRepositorySQL";
import ClassifyInRepository from "../../../../core/ports/repositories/ClassifyIn.repository";
import ClassifyInRepositorySQL from "../../../secondaries/mysql/repositories/ClassifyInRepositorySQL";
import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import IllustrateRecipeRepositorySQL from "../../../secondaries/mysql/repositories/IllustrateRecipeRepositorySQL";

export default class RecipeConfig {
    private recipeRepository: RecipeRepository = new RecipeRepositorySQL();
    private mailingRepository: MailingRepository = new MailingRepositoryGmail();
    private userRepository: UserRepository = new UserRepositorySQL();
    private favoriRepository: FavoriRepository = new FavoriRepositorySQL();
    private stepRepository: StepRepository = new StepRepositorySQL();
    private useIngredientRepository: UseIngredientRepository = new UseIngredientRepositorySQL();
    private classifyInRepository: ClassifyInRepository = new ClassifyInRepositorySQL();
    private illustrateRecipeRepository: IllustrateRecipeRepository = new IllustrateRecipeRepositorySQL();

    public getAllRecipeUseCase(): FindAllRecipesUsecase {
        return new FindAllRecipesUsecase(this.recipeRepository);
    }

    public getAllPerToNbViewUseCase(): FindAllPerToNbViewUsecase {
        return new FindAllPerToNbViewUsecase(this.recipeRepository);
    }

    public getRecipeByIdUseCase(): FindRecipeByIdUsecase {
        return new FindRecipeByIdUsecase(this.recipeRepository);
    }

    public getIngredientsByIdRecipeUseCase(): FindIngredientsByIdRecipeUsecase {
        return new FindIngredientsByIdRecipeUsecase(this.recipeRepository);
    }

    public getCategoriesByIdRecipeUseCase(): FindCategoriesByIdRecipeUsecase {
        return new FindCategoriesByIdRecipeUsecase(this.recipeRepository);
    }

    public getLatestRecipesUseCase(): FindLatestRecipesUsecase {
        return new FindLatestRecipesUsecase(this.recipeRepository);
    }

    public getMostPopularRecipesUseCase(): FindMostPopularRecipesUsecase {
        return new FindMostPopularRecipesUsecase(this.recipeRepository);
    }

    public createRecipeUseCase(): CreateRecipeUseCase {
        return new CreateRecipeUseCase(this.recipeRepository, this.mailingRepository, this.userRepository);
    }

    public updateRecipeUseCase(): UpdateRecipeUseCase {
        return new UpdateRecipeUseCase(this.recipeRepository, this.classifyInRepository, this.useIngredientRepository,
            this.stepRepository, this.illustrateRecipeRepository);
    }

    public updateNbViewsUseCase(): UpdateNbViewsUseCase {
        return new UpdateNbViewsUseCase(this.recipeRepository);
    }

    public deleteRecipeUseCase(): DeleteRecipeUseCase {
        return new DeleteRecipeUseCase(this.recipeRepository);
    }

    public researchFilterUseCase(): ResearchFilterUseCase {
        return new ResearchFilterUseCase(this.recipeRepository, this.favoriRepository);
    }
}
