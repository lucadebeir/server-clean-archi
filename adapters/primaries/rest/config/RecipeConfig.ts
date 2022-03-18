import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateRecipeUseCase from "../../../../core/usecases/recipe/CreateRecipe.usecase";
import DeleteRecipeUseCase from "../../../../core/usecases/recipe/DeleteRecipe.usecase";
import GetAllPerToNbViewUseCase from "../../../../core/usecases/recipe/GetAllPerToNbView.usecase";
import GetAllRecipesUseCase from "../../../../core/usecases/recipe/GetAllRecipes.usecase";
import GetCategoriesByIdRecipeUseCase from "../../../../core/usecases/recipe/GetCategoriesByIdRecipe.usecase";
import GetIngredientsByIdRecipeUseCase from "../../../../core/usecases/recipe/GetIngredientsByIdRecipe.usecase";
import GetLatestRecipesUseCase from "../../../../core/usecases/recipe/GetLatestRecipes.usecase";
import GetMostPopularRecipesUseCase from "../../../../core/usecases/recipe/GetMostPopularRecipes.usecase";
import GetRecipeByIdUseCase from "../../../../core/usecases/recipe/GetRecipeById.usecase";
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

export default class RecipeConfig {
    private recipeRepository: RecipeRepository = new RecipeRepositorySQL();
    private mailingRepository: MailingRepository = new MailingRepositoryGmail();
    private userRepository: UserRepository = new UserRepositorySQL();
    private favoriRepository: FavoriRepository = new FavoriRepositorySQL();
    private stepRepository: StepRepository = new StepRepositorySQL();
    private useIngredientRepository: UseIngredientRepository = new UseIngredientRepositorySQL();
    private classifyInRepository: ClassifyInRepository = new ClassifyInRepositorySQL();

    public getAllRecipeUseCase(): GetAllRecipesUseCase {
        return new GetAllRecipesUseCase(this.recipeRepository);
    }

    public getAllPerToNbViewUseCase(): GetAllPerToNbViewUseCase {
        return new GetAllPerToNbViewUseCase(this.recipeRepository);
    }

    public getRecipeByIdUseCase(): GetRecipeByIdUseCase {
        return new GetRecipeByIdUseCase(this.recipeRepository);
    }

    public getIngredientsByIdRecipeUseCase(): GetIngredientsByIdRecipeUseCase {
        return new GetIngredientsByIdRecipeUseCase(this.recipeRepository);
    }

    public getCategoriesByIdRecipeUseCase(): GetCategoriesByIdRecipeUseCase {
        return new GetCategoriesByIdRecipeUseCase(this.recipeRepository);
    }

    public getLatestRecipesUseCase(): GetLatestRecipesUseCase {
        return new GetLatestRecipesUseCase(this.recipeRepository);
    }

    public getMostPopularRecipesUseCase(): GetMostPopularRecipesUseCase {
        return new GetMostPopularRecipesUseCase(this.recipeRepository);
    }

    public createRecipeUseCase(): CreateRecipeUseCase {
        return new CreateRecipeUseCase(this.recipeRepository, this.mailingRepository, this.userRepository);
    }

    public updateRecipeUseCase(): UpdateRecipeUseCase {
        return new UpdateRecipeUseCase(this.recipeRepository, this.classifyInRepository, this.useIngredientRepository, this.stepRepository
        );
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
