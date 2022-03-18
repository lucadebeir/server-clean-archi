import {TechnicalException} from "../../../../core/exceptions/TechnicalException";
import StepRepository from "../../../../core/ports/repositories/Step.repository";
import Step from "../../../../core/domain/Step";
import StepSequelize from "../entities/Step.model";

export default class StepRepositorySQL implements StepRepository {

    check(step: Step): Promise<boolean> {
        return StepSequelize.findOne({
            where: {
                id_recipe: step.id_recipe,
                number: step.number
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    addStepToRecipe(step: Step): Promise<string> {
        return StepSequelize.create(step)
            .then((step: any) => {
                return step;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    update(step: Step): Promise<string> {
        return StepSequelize.update(
            {
                indication: step.indication
            },
            {
                where: {
                    id_recipe: step.id_recipe,
                    number: step.number
                },
            }
        )
            .then(() => {
                return "Etape modifiée !";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    delete(step:Step): Promise<string> {
        return StepSequelize.destroy({
            where: {
                id_recipe: step.id_recipe,
                number: step.number,
            },
        })
            .then(() => {
                return "Etape supprimée !";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
