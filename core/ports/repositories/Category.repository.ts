import Category from "../../domain/Category";
import Recipe from "../../domain/Recipe";

export default interface CategoryRepository {
    findAll(): Promise<Category[]>;
    
    getRecipesByIdCategory(id: any): Promise<Recipe[]>;
    getRecipesByIdCategoryPerToNbView(id: any): Promise<Recipe[]>;
}