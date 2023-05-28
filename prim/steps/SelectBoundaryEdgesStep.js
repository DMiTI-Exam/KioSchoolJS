import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { AddEdgeToTreeStep } from "./AddEdgeToTreeStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { PrimController } from "../controller/PrimController.js";
import { SelectBoundaryEdgesStepView } from "./SelectBoundaryEdgesStepView.js";

/**
 * Шаг выделения граничных ребер
 */
export class SelectBoundaryEdgesStep extends AbstractStep {
    /**
     * Массив граничных ребер, выделенных на данном шаге
     */
    #boundaryEdges = []

    getView() {
        return new SelectBoundaryEdgesStepView();
    }

    next() {
        return new AddEdgeToTreeStep();
    }

    oracle() {
        this.#boundaryEdges = PrimController.instanceGetter().graphGetter().getBoundaryEdges();
        for (let edge of this.#boundaryEdges) {
            edge.selectedSetter(true);
        }
    }

    antiOracle() {
        for (let edge of this.#boundaryEdges) {
            edge.selectedSetter(false);
        }
    }

    checkInput(textConsumer = null) {
        this.#boundaryEdges = [];
        for (let edge of PrimController.instanceGetter().graphGetter().edgesGetter()) {
            if (edge.selectedGetter()) {
                this.#boundaryEdges.push(edge);
            }
        }

        if (!PrimController.instanceGetter().equal(this.#boundaryEdges,
            PrimController.instanceGetter().graphGetter().getBoundaryEdges())) {
            CommentManager.instanceGetter().getHelp("prim_select_bridge_error", textConsumer,
                "Граничные ребра выделены неверно");
            return "Граничные ребра выделены неверно.";
        }

        return null;
    }

    restore() {
        for (let edge of PrimController.instanceGetter().graphGetter().edgesGetter()) {
            edge.selectedSetter(false);
        }
    }

    update() {
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("prim_select_bridge", textConsumer,
            "На этом шаге необходимо выделить все граничные ребра");

    }

    codeGetter() {
        return "prim_select_bridge";
    }
}