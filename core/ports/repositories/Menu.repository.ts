import Menu from "../../domain/Menu";
import Recipe from "../../domain/Recipe";

export default interface MenuRepository {
    findMenu(): Promise<Menu>;
    findById(id: any): Promise<Recipe>;

    updateById(id: any, idRecette: any): Promise<Recipe>;
}