import ClassifyIn from "../../domain/ClassifyIn";

export default interface ClassifyInRepository {
  addCategoryToRecipe(classify: ClassifyIn): Promise<string>;
  deleteCategoryFromRecipe(classify: ClassifyIn): Promise<string>;

  check(classify: ClassifyIn): Promise<boolean>;
}
