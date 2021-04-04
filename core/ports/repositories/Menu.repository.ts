import Recipe from "../../domain/Recipe";

export default interface MenuRepository {
  findMenu(): Promise<Recipe[]>;
  findById(id: any): Promise<Recipe>;

  updateById(id: any, idRecette: any): Promise<string>;

  existById(id: any): Promise<boolean>;
}
