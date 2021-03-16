import Ingredient from "../../domain/Ingredient";

export default interface IngredientRepository {
    findAll(): Promise<Ingredient[]>;
}