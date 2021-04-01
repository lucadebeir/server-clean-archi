import Unity from "../../domain/Unity";

export default interface UnityRepository {
  create(unity?: Unity): Promise<Unity>;
  findAll(): Promise<Unity[]>;
  findById(id: any): Promise<Unity>;

  deleteById(id: any): Promise<string>;
  update(unity?: Unity): Promise<Unity>;

  checkExistByName(name: any): Promise<boolean>;
  checkExistInRecipes(id: any): Promise<boolean>;

  existById(id: any): Promise<boolean>;
}
