import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { DijkstraVertex } from "../model/DijkstraVertex.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { NextVertexSelectionStep } from "./NextVertexSelectionStep.js";
import { DijkstraController } from "../controller/DijkstraController.js";
import { AdjacentVertexCorrectionStepView } from "./AdjacentVertexCorrectionStepView.js";

/**
 * Шаг коррекции смежной вершины
 */
export class AdjacentVertexCorrectionStep extends AbstractStep {
    /**
     * Массив вершин, скорректированных на данном шаге
     */
    #arr = [];

    /**
     * Словарь старых весов (до этого шага)
     */
    #lastWeight = new Map();

    /**
     * Словарь пользовательских весов
     */
    #userWeight = new Map();

    getView() {
        return new AdjacentVertexCorrectionStepView();
    }

    next() {
        return new NextVertexSelectionStep();
    }

    oracle() {
        let treeVertex = DijkstraController.instanceGetter().lastInTreeVertexGetter();

        this.#arr = [];
        this.#lastWeight = new Map();

        for (let v of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            if (!v.selectedGetter()) {
                continue;
            }

            this.#arr.push(v);
            this.#lastWeight.set(v.nameGetter(), v.weightGetter());

            //если в первый раз - инициализируем, иначе - корректируем
            if (v.weightGetter() === DijkstraVertex.INFINITY_COST) {
                v.weightSetter(treeVertex.weightGetter() + DijkstraController.instanceGetter().graphGetter().getEdge(treeVertex, v).weightGetter());
            } else {
                v.weightSetter(Math.min(v.weightGetter(), treeVertex.weightGetter() + DijkstraController.instanceGetter().graphGetter().getEdge(v, treeVertex).weightGetter()));
            }
        }
    }

    antiOracle() {
        for (let v of this.#arr) {
            v.weightSetter(this.#lastWeight.get(v.nameGetter()));
        }

        this.#lastWeight = new Map();
        this.#arr = [];
    }

    checkInput(textConsumer = null) {
        let treeVertex = DijkstraController.instanceGetter().lastInTreeVertexGetter();

        this.#arr = [];
        this.#lastWeight = new Map();

        let err = null;

        for (let v of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            if (!v.selectedGetter()) {
                if (this.#userWeight.get(v.nameGetter()) != null) {
                    if (v.weightGetter() !== parseInt(this.#userWeight.get(v.nameGetter()))) {
                        err = "Неверно выполнена корректровка весов.";
                    }
                }

                continue;
            }

            this.#arr.push(v);
            this.#lastWeight.set(v.nameGetter(), v.weightGetter());
            let s = v.viewsGetter()[0].tfGetter().getText();

            //если в первый раз - инициализируем, иначе - корректируем
            if (v.weightGetter() === DijkstraVertex.INFINITY_COST) {
                v.weightSetter(treeVertex.weightGetter() + DijkstraController.instanceGetter().graphGetter().getEdge(treeVertex, v).weightGetter());
            } else {
                if (DijkstraController.instanceGetter().graphGetter().getEdge(v, treeVertex) != null) {
                    v.weightSetter(Math.min(v.weightGetter(), treeVertex.weightGetter() + DijkstraController.instanceGetter().graphGetter().getEdge(v, treeVertex).weightGetter()));
                }
            }

            if (this.#lastWeight.get(v.nameGetter()) !== v.weightGetter()) {
                if (v.weightGetter() !== parseInt(this.#userWeight.get(v.nameGetter()))) {
                    err = "Неверно выполнена корректровка весов.";
                }
            }

            v.weightSetter(this.#lastWeight.get(v.nameGetter()));
            v.viewsGetter()[0].tfGetter().setText(s);
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING && err != null) {
            CommentManager.instanceGetter().getHelp("dijkstra_weight_correction_error", textConsumer, err);
            return err;
        }

        //в контроле выполняем действия
        this.#arr = [];
        this.#lastWeight = new Map();
        for (let vv of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            if (!vv.selectedGetter()) {
                if (this.#userWeight.get(vv.nameGetter()) == null) {
                    continue;
                }
            }

            this.#arr.push(vv);
            this.#lastWeight.set(vv.nameGetter, vv.weightGetter());

            let s1 = vv.viewsGetter()[0].tfGetter().getText();
            vv.weightSetter(parseInt(s1));
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("dijkstra_weight_correction_error", textConsumer, err);
        }

        return err;
    }

    getUserWeight() {
        return this.#userWeight;
    }

    inputUserWeight(v, weight) {
        this.#userWeight.set(v.nameGetter(), weight);
        v.viewsGetter()[0].tfGetter().setText(weight);
        v.viewsGetter()[1].tfCurrentGetter().setText(weight);
    }

    restore() {
        for (let v of DijkstraController.instanceGetter().graphGetter().vertexesGetter()) {
            v.viewsGetter()[0].update();
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("dijkstra_weight_correction", textConsumer,
            "На этом шаге необходимо скорректировать веса для смежных вершин");

    }

    codeGetter() {
        return "dijkstra_weight_correction";
    }

    update() {
        this.#userWeight = new Map();
        DijkstraController.instanceGetter().updateInput();
    }
}