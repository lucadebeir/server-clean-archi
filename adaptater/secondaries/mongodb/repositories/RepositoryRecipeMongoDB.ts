import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";

import { MongoClient } from "mongodb";

export default class RepositoryRecipeMongoDB implements RecipeRepository {
  findAll(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findgById(): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
