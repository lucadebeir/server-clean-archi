import Recipe from "../../domain/Recipe";

export default interface RecipeRepository {
  findAll(): Promise<Recipe[]>;
  findgById(): Promise<Recipe>;
}
