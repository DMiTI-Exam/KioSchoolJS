import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { NextVertexSelectionStepView } from "./NextVertexSelectionStepView.js";
import { FinalStep } from "./FinalStep.js";
import { ManipulatorManager} from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { DijkstraController } from "../controller/DijkstraController.js";
import { AdjacentVertexSelectionStep } from "./AdjacentVertexSelectionStep.js";

/**
 * Шаг выбора ближайшей к построенному дереву вершины
 */
export class NextVertexSelectionStep extends AbstractStep {
    #lastInTree;
    #inTree;
    #inTreeEdge;

    /**
     * Массив вершин, скорректированных на данном шаге
     */
    #arr = [];

    getView() {
        return new NextVertexSelectionStepView();
    }

    next() {
        //Если все вершины уже в деревы - последний шаг
        if (DijkstraController.instanceGetter().graphGetter().getAmountOfVertexesInTree() ===
            DijkstraController.instanceGetter().graphGetter().vertexesGetter().length) {
            return new FinalStep()
        }

        return new AdjacentVertexSelectionStep()
    }

    oracle() {
        this.#arr = [];
        this.#inTree = DijkstraController.instanceGetter().graphGetter().getNextSelection();
        this.#lastInTree = DijkstraController.instanceGetter().lastInTreeVertexGetter();
        this.#inTreeEdge = DijkstraController.instanceGetter().graphGetter().getEdgeToTree(this.#inTree);
        this.#inTreeEdge.inTreeSetter(true);
        this.#inTree.inTreeSetter(true);
        DijkstraController.instanceGetter().lastInTreeVertexSetter(this.#inTree);
        for (let v of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            if (v.selectedGetter()) {
                this.#arr.push(v);
            }

            v.selectedSetter(false);
        }
    }

    antiOracle() {
        if (this.#inTreeEdge != null) {
            this.#inTreeEdge.inTreeSetter(false);
        }

        if (this.#inTree != null) {
            this.#inTree.inTreeSetter(false);
        }

        DijkstraController.instanceGetter().lastInTreeVertexSetter(this.#lastInTree);
        for (let v of this.#arr) {
            v.selectedSetter(true);
        }
    }

    checkInput(textConsumer = null) {
        let err = null;

        if (this.#inTree == null) {
            err = "Необходимо включить вершину в дерево.";
        } else {
            this.#inTree.inTreeSetter(false);
            if (this.#inTree.weightGetter() !== DijkstraController.instanceGetter().graphGetter()
                .getNextSelection().weightGetter()) {
                err = "Выбрана неверная вершина. Необходимо выбрать вершину с минимальным весом";
            }

            this.#inTree.inTreeSetter(true);
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING && err != null) {
            CommentManager.instanceGetter().getHelp("dijkstra_next_vertex_error", textConsumer, err);
            return err;
        }

        //в контроле выполняем действия
        this.#arr = [];
        this.#lastInTree = DijkstraController.instanceGetter().lastInTreeVertexGetter();
        if (this.#inTree != null) {
            this.#inTreeEdge = DijkstraController.instanceGetter().graphGetter().getEdgeToTree(this.#inTree);
            if (this.#inTreeEdge != null) {
                this.#inTreeEdge.inTreeSetter(true);
            }

            this.#inTree.inTreeSetter(true);
        }

        if (this.#inTree != null) {
            DijkstraController.instanceGetter().lastInTreeVertexSetter(this.#inTree);
        }

        for (let v of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            if (v.selectedGetter()) {
                this.#arr.push(v);
            }

            v.selectedSetter( false);
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("dijkstra_next_vertex_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        if (this.#inTree != null) {
            this.#inTree.inTreeSetter(false)
        }
    }

    userSelect(v) {
        if (this.#inTree != null) {
            this.#inTree.inTreeSetter(false);
        }

        this.#inTree = v;
        this.#inTree.inTreeSetter(true);
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("dijkstra_next_vertex", textConsumer,
            "На этом шаге необходимо выбрать ближайшую к построенному дереву вершину");
    }

    codeGetter() {
        return "dijkstra_next_vertex";
    }

    update() {
        DijkstraController.instanceGetter().updateInput();
    }
}