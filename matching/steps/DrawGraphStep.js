import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { MatchingController } from "../controller/MatchingController.js";
import { HexogenView } from "./HexogenView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { FormGraphStep } from "./FormGraphStep.js";

export class DrawGraphStep extends AbstractStep {
    #graph = MatchingController.instanceGetter().graphGetter();
    #v1;

    getView() {
        return new HexogenView();
    }

    next() {
        return new FormGraphStep();
    }

    oracle() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].dotMarkedSetter(true);
        }

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            this.#graph.edgesGetter()[i].approvedSetter(!this.#graph.edgesGetter()[i].deletedGetter());
        }
    }

    antiOracle() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].dotMarkedSetter(false);
        }

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            this.#graph.edgesGetter()[i].approvedSetter(false);
        }
    }

    checkInput(textConsumer = null) {
        let err = null;
        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].approvedGetter() !== !this.#graph.edgesGetter()[i].deletedGetter()) {
                err = "Неправильно сформирован граф";
            }
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("matching_draw_graph_error", textConsumer, err);
            return err;
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("matching_draw_graph_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].dotMarkedSetter(false);
            this.#graph.vertexesGetter()[i].viewsGetter()[0].reset();
        }

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            this.#graph.edgesGetter()[i].approvedSetter(false);
        }

        this.update();
    }

    update() {
        this.#graph.viewGetter().update();
        this.#graph.chainViewGetter().update();
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("matching_draw_graph", textConsumer,
            "Нарисуйте граф");
    }

    codeGetter() {
        return "matching_draw_graph";
    }

    allowSelect(vertex) {
        if (this.#v1 == null) {
            return true;
        } else {
            return this.#graph.getEdge(this.#v1, vertex) != null;
        }
    }

    click(vertex) {
        if (vertex == null) {
            this.#v1 = null;
            return;
        }

        if (this.#v1 == null) {
            this.#v1 = vertex;
        } else {
            if (this.#graph.getEdge(this.#v1, vertex).approvedGetter()) {
                this.#graph.getEdge(this.#v1, vertex).approvedSetter(false);
                this.#graph.markedOnlyInApprovedEdge(this.#v1);
                this.#graph.markedOnlyInApprovedEdge(vertex);
                this.#v1.viewsGetter()[0].reset();
                vertex.viewsGetter()[0].reset();
            } else {
                this.#graph.getEdge(this.#v1, vertex).approvedSetter(true);
                this.#v1.viewsGetter()[0].reset();
                vertex.viewsGetter()[0].reset();
                this.#v1.dotMarkedSetter(true);
                vertex.dotMarkedSetter(true);
            }

            this.#v1 = null;
        }

        this.#graph.viewGetter().update();
    }
}