import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { TreeView } from "../view/TreeView.js";
import { CalcCodeStep } from "./CalcCodeStep.js";
import { GlueStep } from "./GlueStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";

export class CalcWeightStep extends AbstractStep {
    #controller = HuffmanController.instanceGetter();
    #node;

    getView() {
        return new TreeView();
    }

    next() {
        if (this.#controller.huffmanTreeGetter().isFinishGlue()) {
            return new CalcCodeStep();
        } else {
            return new GlueStep();
        }
    }

    oracle() {
        let glueStep = ManipulatorManager.instanceGetter().previousStepGetter();
        this.#node = glueStep.parentNodeGetter();
        if (this.#node != null) {
            this.#node.probabilitySetter(this.#node.getProbability());
        }

        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            node.selectedSetter(false);
        }
    }

    checkInput(textConsumer = null) {
        let err = null;
        let glueStep = ManipulatorManager.instanceGetter().previousStepGetter();
        this.#node = glueStep.parentNodeGetter();
        if (this.#node == null) {
            err = "Неверный узел";
        } else if (this.#node.probabilityGetter() !== this.#node.firstChildGetter().probabilityGetter() +
            this.#node.secondChildGetter().probabilityGetter()) {
            err = "Неверно посчитан вес";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calcweight_error", textConsumer, err);
            return err;
        }

        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            node.selectedSetter(false);
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calcweight_error", textConsumer, err);
        }

        return err;
    }

    update() {
        this.#controller.regimeChanged(ManipulatorManager.instanceGetter().regimeGetter());
        let glueStep = ManipulatorManager.instanceGetter().previousStepGetter();
        if (glueStep.firstNode != null) {
            glueStep.firstNode.selectedSetter(true);
        }

        if (glueStep.secondNode != null) {
            glueStep.secondNode.selectedSetter(true);
        }
    }

    antiOracle() {
        if (this.#node != null) {
            this.#node.probabilitySetter(0);
        }
    }

    restore() {
        if (this.#node != null) {
            this.#node.probabilitySetter(0);
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("huffman_calcweight", textConsumer,
            "На этом шаге необходимо вычислить вес");
    }

    codeGetter() {
        return "huffman_calcweight";
    }
}