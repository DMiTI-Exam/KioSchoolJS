import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CalculateWeightStepView } from "./CalculateWeightStepView.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { ChoseNextCellStep } from "./ChoseNextCellStep.js";
import { HorseController } from "../controller/HorseController.js";

/**
 * Шаг выделения возомжных шагов для коня
 */
export class CalculateWeightStep extends AbstractStep {
    /**
     * Массив вершин, скорректированных на данном шаге
     */
    #arr = [];

    getView() {
        return new CalculateWeightStepView();
    }

    next() {
        return new ChoseNextCellStep();
    }

    oracle() {
        this.#arr = [];

        for (let v of HorseController.instanceGetter().boardGetter().listOfCellsGetter()) {
            if (!v.selectedGetter()) {
                continue;
            }

            this.#arr.push(v);
            v.weightSetter(HorseController.instanceGetter().boardGetter().getNextStepsCount(v));
        }
    }

    antiOracle() {
        for (let cell of this.#arr) {
            cell.weightSetter(-1);
        }
    }

    checkInput(textConsumer = null) {
        this.#arr = [];
        let err = false;
        for (let v of HorseController.instanceGetter().boardGetter().listOfCellsGetter()) {
            if (!v.selectedGetter()) {
                continue;
            }

            this.#arr.push(v);
            if (v.weightGetter() !== HorseController.instanceGetter().boardGetter().getNextStepsCount(v)) {
                err = true;
            }
        }

        if (err) {
            CommentManager.instanceGetter().getHelp("horse_calc_weight_error", textConsumer,
                "На этом шаге необходимо определить вес позиций");
            return " ";
        }

        return null;
    }

    restore() {
        for (let cell of this.#arr) {
            cell.weightSetter(-1);
        }
    }

    inputUserWeight(v, weight) {
        v.weightSetter(Number(weight));
    }

    update() {
        this.#arr = [];
        for (let v of HorseController.instanceGetter().boardGetter().listOfCellsGetter()) {
            if (!v.selectedGetter()) {
                continue;
            }

            this.#arr.push(v);
        }

        HorseController.instanceGetter().updateViews();
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("horse_calc_weight", textConsumer,
            "На этом шаге необходимо определить вес позиций");
    }

    codeGetter() {
        return "horse_calc_weight";
    }
}