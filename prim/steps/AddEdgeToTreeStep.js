import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { FinalStep } from "./FinalStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { PrimController } from "../controller/PrimController.js";
import { AddEdgeToTreeStepView } from "./AddEdgeToTreeStepView.js";
import { SelectBoundaryEdgesStep } from "./SelectBoundaryEdgesStep.js";

/**
 * Шага включения нового ребра в минимальное остовное дерево
 */
export class AddEdgeToTreeStep extends AbstractStep {
    /**
     * Ребро, включенное в дерево на шаге
     */
    #edge;

    /**
     * Вершина, включенное в дерево на шаге
     */
    #vertex;

    /**
     * Вершина, включенное в дерево на шаге - возможно только в режиме контроля
     */
    #vertex1;

    /**
     * Массив граничных ребер, из которых происходил выбор наименьшего
     */
    #boundaryEdges;

    getView() {
        return new AddEdgeToTreeStepView();
    }

    next() {
        //Если все вершины уже в деревы - следующий шаг - последний
        if (PrimController.instanceGetter().graphGetter().getAmountOfVertexesInTree() ===
            PrimController.instanceGetter().graphGetter().vertexesGetter().length) {
            return new FinalStep();
        }

        return new SelectBoundaryEdgesStep();
    }

    oracle() {
        this.#edge = PrimController.instanceGetter().graphGetter().getMinimumFromSelectedEdges();
        this.#edge.inTreeSetter(true);
        if (!this.#edge.sourceGetter().inTreeGetter()) {
            this.#edge.sourceGetter().inTreeSetter(true);
            this.#vertex = this.#edge.sourceGetter();
        } else {
            this.#edge.targetGetter().inTreeSetter(true);
            this.#vertex = this.#edge.targetGetter();
        }

        this.#boundaryEdges = [];
        for (let edge of PrimController.instanceGetter().graphGetter().edgesGetter()) {
            if (edge.selectedGetter()) {
                edge.selectedSetter(false);
                this.#boundaryEdges.push(edge);
            }
        }
    }

    antiOracle() {
        if (this.#edge != null) {
            this.#edge.inTreeSetter(false);
        }

        if (this.#vertex != null) {
            this.#vertex.inTreeSetter(false);
        }

        if (this.#vertex1 != null) {
            this.#vertex1.inTreeSetter(false);
        }

        for (let edge of this.#boundaryEdges) {
            edge.selectedSetter(true);
        }
    }

    checkInput(textConsumer = null) {
        let err = null;

        if (this.#edge == null) {
            err = "Необходимо выбрать кратчайшее граничное ребро.";
        } else if (this.#edge.weightGetter() !== PrimController.instanceGetter().graphGetter()
            .getMinimumFromSelectedEdges().weightGetter()) {
            err = "Выбрано неверное ребро. Необходимо выбрать кратчайшее граничное ребро";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() ===
            ManipulatorManager.REGIME_TRAINING && err != null) {
            CommentManager.instanceGetter().getHelp("prim_add_edge_error", textConsumer, err);
            return err;
        }

        //в контроле выполняем действия
        if (this.#edge != null) {
            if (!this.#edge.sourceGetter().inTreeGetter()) {
                this.#edge.sourceGetter().inTreeSetter(true);
                this.#vertex = this.#edge.sourceGetter();
            }

            if(!this.#edge.targetGetter().inTreeGetter()){
                this.#edge.targetGetter().inTreeSetter(true);
                this.#vertex1 = this.#edge.targetGetter();
            }
        }

        this.#boundaryEdges = [];
        for (let edge of PrimController.instanceGetter().graphGetter().edgesGetter()) {
            if (edge.selectedGetter()) {
                edge.selectedSetter(false);
                this.#boundaryEdges.push(edge)
            }
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("prim_add_edge_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        if (this.#edge != null) {
            this.#edge.inTreeSetter(false);
        }
    }

    update() {
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("prim_add_edge", textConsumer,
            "На этом шаге необходимо выбрать кратчайшее граничное ребро");
    }

    codeGetter() {
        return "prim_add_edge";
    }

    changeUser(e) {
        if (this.#edge != null) {
            this.#edge.inTreeSetter(false);
        }

        this.#edge = e;
        if (this.#edge != null) {
            this.#edge.inTreeSetter(true);
        }
    }

    edge() {
        return this.#edge;
    }
}