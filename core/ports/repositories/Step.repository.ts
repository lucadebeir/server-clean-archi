import Step from "../../domain/Step";

export default interface StepRepository {
    addStepToRecipe(step: Step): Promise<string>;
    delete(step: Step): Promise<string>;
    check(step: Step): Promise<boolean>;
    update(step: Step): Promise<string>;
}
