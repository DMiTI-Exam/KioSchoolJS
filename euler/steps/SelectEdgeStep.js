import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { FinalStep } from "./FinalStep.js";
import { Cycle } from "../model/Cycle.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { EulerController } from "../controller/EulerController.js";
import { GraphView } from "./GraphView.js";

export class SelectEdgeStep extends AbstractStep {
    #graph = EulerController.instanceGetter().graphGetter();
    vertex;
    edge;
    newCycle = false;
    cycle;
    pos = 0;

    getView() {
        return new GraphView();
    }

    next() {
        if (EulerController.instanceGetter().containFreeEdge() ||
            EulerController.instanceGetter().initVertexGetter() !==
            EulerController.instanceGetter().currentVertexGetter()) {
            return new SelectEdgeStep();
        } else {
            return new FinalStep();
        }
    }

    oracle() {
        this.vertex = EulerController.instanceGetter().currentVertexGetter();
        if (this.vertex === EulerController.instanceGetter().initVertexGetter() &&
            EulerController.instanceGetter().getFreeEdge(this.vertex) === null &&
            EulerController.instanceGetter().prelastEmpty()) {
            EulerController.instanceGetter().cyclesGetter().push(new Cycle());
            this.newCycle = true;
        }

        this.edge = EulerController.instanceGetter().getFreeEdge(this.vertex);
        if (this.edge == null) {
            this.edge = EulerController.instanceGetter().removeNextFromPrelast();
            this.cycle = EulerController.instanceGetter().prelastCycleGetter();
        }

        this.#moveNext();
    }

    #moveNext() {
        EulerController.instanceGetter().lastCycleGetter().edgesGetter().push(this.edge);
        EulerController.instanceGetter().currentVertexSetter(this.edge.getAnother(this.vertex));

        if (EulerController.instanceGetter().currentVertexGetter() !== this.edge.targetGetter()) {
            this.edge.inverseSetter(true);
        } else {
            this.edge.inverseSetter(false);
        }
    }

    antiOracle() {
        EulerController.instanceGetter().currentVertexSetter(this.vertex);
        if (this.edge != null) {
            EulerController.instanceGetter().lastCycleGetter().removeEdge(this.edge);
        }

        if (this.cycle != null) {
            this.cycle.edgesGetter().splice(this.pos, 0, this.edge);
        }

        if (this.newCycle) {
            EulerController.instanceGetter().cyclesGetter().pop();
        }
    }

    checkInput(textConsumer = null) {
        let err = null;

        this.vertex = EulerController.instanceGetter().currentVertexGetter();
        let e = this.#graph.getSelectedEdge();

        if (e == null) {
            err = "Надо выбрать ребро";
        } else {
            if (!EulerController.instanceGetter().isFreeEdge(this.vertex, e)) {
                err = "Неверное ребро";
            }
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("euler_make_path_error", textConsumer, err);
            return err;
        }

        if (e == null) {

        } else {
            if (this.vertex === EulerController.instanceGetter().initVertexGetter() &&
                EulerController.instanceGetter().getFreeEdge(this.vertex) == null &&
                EulerController.instanceGetter().prelastEmpty()) {
                EulerController.instanceGetter().cyclesGetter().push(new Cycle());
                this.newCycle = true;
            }

            this.edge = e;

            this.cycle = EulerController.instanceGetter().removeEdgeFromCycle(this.edge);
            if (this.cycle != null) {
                this.pos = EulerController.instanceGetter().getPos();
            }

            this.#moveNext();
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("euler_make_path_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        this.#graph.clearEdgeSelection(null);
        this.#graph.viewGetter().update();
    }

    update() {
        this.#graph.clearEdgeSelection(null);
        this.#graph.viewGetter().update();
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("euler_select_edge", textConsumer,
            "Выделите следующее ребро");
    }

    codeGetter() {
        return "euler_select_edge";
    }
}