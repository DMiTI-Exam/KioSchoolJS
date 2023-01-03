import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { AdjacentVertexSelectionStepView } from "./AdjacentVertexSelectionStepView.js";
import { NextVertexSelectionStep } from "./NextVertexSelectionStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { DijkstraController } from "../controller/DijkstraController.js";
import { AdjacentVertexCorrectionStep } from "./AdjacentVertexCorrectionStep.js";

/**
 * Шаг выделения смежной вершины
 */
export class AdjacentVertexSelectionStep extends AbstractStep {
    /**
     * Массив вершин, скорректированных на данном шаге
     */
    #arr = [];

    getView() {
        return new AdjacentVertexSelectionStepView();
    }

    next() {
        if (this.#arr.length === 0) {
            return new NextVertexSelectionStep();
        } else {
            return new AdjacentVertexCorrectionStep();
        }
    }

    oracle() {
        let treeVertex = DijkstraController.instanceGetter().lastInTreeVertexGetter();
        this.#arr = DijkstraController.instanceGetter().graphGetter().getAdjWith(treeVertex);

        for (let v of this.#arr) {
            v.selectedSetter(true);
        }
    }

    antiOracle() {
        for (let v of this.#arr) {
            v.selectedSetter(false);
        }

        this.#arr = [];
    }

    checkInput(textConsumer = null) {
        let treeVertex = DijkstraController.instanceGetter().lastInTreeVertexGetter();
        if (!DijkstraController.instanceGetter().equal(this.#arr,
            DijkstraController.instanceGetter().graphGetter().getAdjWith(treeVertex))) {
            let err = "Смежные вершины выделены неверно.";
            CommentManager.instanceGetter().getHelp("dijkstra_select_adjacent_error", textConsumer, err);
            return err;
        }

        return null;
    }

    restore() {
        for (let v of this.#arr) {
            v.selectedSetter(false);
        }

        this.#arr = [];
    }

    userSelect(v) {
        if (!v.selectedGetter()) {
            v.selectedSetter(true);
            this.#arr.push(v);
        } else {
            //перестраиваем массив, если снято выделение с одной из вершин
            let ar = [];
            for (let vv of this.#arr) {
                if (vv !== v) {
                    ar.push(vv);
                } else {
                    vv.selectedSetter(false);
                }
            }

            this.#arr = ar;
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("dijkstra_select_adjacent", textConsumer,
            "На этом шаге необходимо выделить смежные вершины");
    }

    codeGetter() {
        return "dijkstra_select_adjacent";
    }

    update() {
        DijkstraController.instanceGetter().updateInput();
    }
}