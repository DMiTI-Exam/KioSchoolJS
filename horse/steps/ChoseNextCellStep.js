import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { ChoseNextCellStepView } from "./ChoseNextCellStepView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HorseController } from "../controller/HorseController.js";
import { FinalStep } from "./FinalStep.js";
import { SelectNextCellsStep } from "./SelectNextCellsStep.js";

/**
 * Шага включения нового ребра в минимальное остовное дерево
 */
export class ChoseNextCellStep extends AbstractStep {
    #lastMinCell;
    #minCell;
    #list;
    #weights = new Map();

    getView() {
        return new ChoseNextCellStepView();
    }

    next() {
        if (this.#minCell == null) {
            return new ChoseNextCellStep();
        }

        if (HorseController.instanceGetter().boardGetter().listOfCellsGetter().length ===
            HorseController.instanceGetter().boardGetter().listOfTraversedCellsGetter().length) {

            return new FinalStep();
        }

        return new SelectNextCellsStep();
    }

    oracle() {
        this.#list = HorseController.instanceGetter().boardGetter().listOfSelectedCellsGetter();
        this.#weights = new Map();
        for (let cell of this.#list) {
            if (this.#minCell == null || this.#minCell.weightGetter() > cell.weightGetter()) {
                this.#minCell = cell;
            }
        }

        for (let cl of this.#list) {
            this.#weights.set(cl, cl.weightGetter());
            cl.selectedSetter(false);
            cl.weightSetter(-1);
        }

        this.#minCell.traversedSetter(true);
        this.#lastMinCell = HorseController.instanceGetter().boardGetter().activeCellGetter();
        HorseController.instanceGetter().boardGetter().activeCellSetter(this.#minCell);
    }

    antiOracle() {
        HorseController.instanceGetter().boardGetter().activeCellSetter(this.#lastMinCell);
        if (this.#minCell != null) {
            this.#minCell.traversedSetter(false);
        }

        for (let cl of this.#list) {
            cl.selectedSetter(true);
            if (this.#weights.get(cl) != null) {
                cl.weightSetter(this.#weights.get(cl));
            }
        }
    }

    checkInput(textConsumer = null) {
        this.#list = HorseController.instanceGetter().boardGetter().listOfSelectedCellsGetter();
        this.#weights = new Map();
        let tempMinCell;

        for (let cell of this.#list) {
            if (tempMinCell == null || tempMinCell.weightGetter() > cell.weightGetter()) {
                tempMinCell = cell;
            }
        }

        let err = null;

        if (this.#minCell == null || this.#minCell.weightGetter() !== tempMinCell.weightGetter()) {
            err = "Error";
        }

        if (err == null || ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_CONTROL) {
            if (this.#minCell != null) {
                for (let cl of this.#list) {
                    this.#weights.set(cl, cl.weightGetter());
                    cl.selectedSetter(false);
                    cl.weightSetter(-1);
                }
            }

            this.#lastMinCell = HorseController.instanceGetter().boardGetter().activeCellGetter();
            if (this.#minCell != null) {
                HorseController.instanceGetter().boardGetter().activeCellSetter(this.#minCell);
            }
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("horse_chose_next_cell_error", textConsumer,
                "На этом шаге необходимо определить вес позиций");
        }

        return err;
    }

    setInput(cell) {
        if (this.#minCell != null) {
            this.#minCell.traversedSetter(false);
        }

        this.#minCell = cell;
        cell.traversedSetter(true);
    }

    restore() {
        if (this.#minCell != null) {
            this.#minCell.traversedSetter(false);
        }

        this.#minCell = null;
    }

    update() {
        HorseController.instanceGetter().updateViews();
        if (this.#minCell != null) {
            this.#minCell.traversedSetter(false);
        }

        this.#minCell = null;
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("horse_chose_next_cell", textConsumer,
            "На этом шаге необходимо выбрать следующий ход");
    }

    codeGetter() {
        return "horse_chose_next_cell";
    }

    changeUser(e) {

    }
}