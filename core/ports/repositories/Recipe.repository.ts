import Recipe from "../../domain/Recipe";

export default interface RecipeRepository {
  findAll(): Promise<Recipe[]>;
  findById(id: any): Promise<Recipe>;
}
