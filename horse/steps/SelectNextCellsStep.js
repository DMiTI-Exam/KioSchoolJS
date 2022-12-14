import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CalculateWeightStep } from "./CalculateWeightStep.js";
import { ChoseNextCellStep } from "./ChoseNextCellStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { HorseController } from "../controller/HorseController.js";
import { SelectNextCellsStepView } from "./SelectNextCellsStepView.js";

/**
 * Шаг выделения возможных шагов для коня
 */
export class SelectNextCellsStep extends AbstractStep {
    /**
     * Массив выделенных клеток
     */
    #boundaryEdges = [];

    getView() {
        return new SelectNextCellsStepView();
    }

    next() {
        if (HorseController.instanceGetter().boardGetter().listOfSelectedCellsGetter().length === 0) {
            return new SelectNextCellsStep();
        }

        if (HorseController.instanceGetter().boardGetter().listOfSelectedCellsGetter().length > 1) {
            return new CalculateWeightStep();
        } else {
            return new ChoseNextCellStep();
        }
    }

    oracle() {
        this.#boundaryEdges = HorseController.instanceGetter().boardGetter().getNextSteps();
        for (let cell of this.#boundaryEdges) {
            cell.selectedSetter(true);
        }
    }

    antiOracle() {
        for (let cell of this.#boundaryEdges) {
            cell.selectedSetter(false);
        }
    }

    checkInput(textConsumer = null) {
        this.#boundaryEdges = [];
        for (let cell of HorseController.instanceGetter().boardGetter().listOfCellsGetter()) {
            if (cell.selectedGetter()) {
                this.#boundaryEdges.push(cell);
            }
        }

        if (!HorseController.instanceGetter()
            .equal(this.#boundaryEdges, HorseController.instanceGetter().boardGetter().getNextSteps())) {
            CommentManager.instanceGetter().getHelp("horse_select_next_cell_error", textConsumer,
                "На этом шаге необходимо выделить возможные шаги");

            return "Граничные ребра выделены неверно.";
        }

        return null;
    }

    restore() {
        for (let cell of HorseController.instanceGetter().boardGetter().listOfCellsGetter()) {
            cell.selectedSetter(false);
        }
    }

    update() {
        HorseController.instanceGetter().updateViews();
        if (ManipulatorManager.instanceGetter().stackSizeGetter() >= 9 &&
            ManipulatorManager.instanceGetter().amountOfErrorsGetter() === 0 &&
            ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_CONTROL) {
            ManipulatorManager.instanceGetter().runAnimation(100);
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("horse_select_next_cell", textConsumer,
            "На этом шаге необходимо выделить возможные шаги");
    }

    codeGetter() {
        return "horse_select_next_cell";
    }
}