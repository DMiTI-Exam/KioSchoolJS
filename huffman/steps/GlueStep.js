import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { TreeView } from "../view/TreeView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { CalcWeightStep } from "./CalcWeightStep.js";

export class GlueStep extends AbstractStep {
    #controller = HuffmanController.instanceGetter();
    firstNode;
    secondNode;
    #parentNode;
    #selectedNodes = [];
    #userSelectedNodes = [];
    #lastSelected;

    getView() {
        return new TreeView();
    }

    next() {
        return new CalcWeightStep();
    }

    oracle() {
        this.#findNodes();
        this.#parentNode = this.#controller.huffmanTreeGetter().glue(this.firstNode, this.secondNode);
        this.firstNode.selectedSetter(true);
        this.secondNode.selectedSetter(true);
    }

    #findNodes() {
        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            if (node.parentGetter() != null) {
                continue;
            }

            if (this.firstNode == null || this.firstNode.probabilityGetter() > node.probabilityGetter()) {
                this.firstNode = node;
            }
        }

        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            if (node.parentGetter() != null || node === this.firstNode) {
                continue;
            }

            if (this.secondNode == null || this.secondNode.probabilityGetter() > node.probabilityGetter()) {
                this.secondNode = node;
            }
        }
    }

    antiOracle() {
        this.firstNode.parentSetter(null);
        this.secondNode.parentSetter(null);
        if (this.#parentNode != null) {
            this.#controller.huffmanTreeGetter().remove(this.#parentNode);
        }
    }

    //должно быть выделено не более двух! и только листья
    checkInput(textConsumer = null) {
        this.#selectedNodes = this.#controller.huffmanTreeGetter().getSelectedNodes();
        this.#findNodes();
        let err = null;
        if (this.#selectedNodes.length !== 2 || !this.#isCorrectNodes()) {
            err = "Неверно выбраны узлы для склейки";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_glue_error", textConsumer, err);
            return err;
        }

        if (this.#selectedNodes.length === 2) {
            this.firstNode = this.#selectedNodes[0];
            this.secondNode = this.#selectedNodes[1];
            this.#parentNode = this.#controller.huffmanTreeGetter().glue(this.firstNode, this.secondNode);
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_glue_error", textConsumer, err);
        }

        return err;
    }

    #isCorrectNodes() {
        for (let i = 0; i < this.#selectedNodes.length; i++) {
            if (this.#selectedNodes[i].probabilityGetter() !== this.firstNode.probabilityGetter() &&
                this.#selectedNodes[i].probabilityGetter() !== this.secondNode.probabilityGetter()) {
                return false;
            }
        }

        return true;
    }

    restore() {
        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            node.selectedSetter(false);
        }

        this.#userSelectedNodes = [];
    }

    update() {
        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            node.selectedSetter(false);
        }

        this.#controller.regimeChanged(ManipulatorManager.instanceGetter().regimeGetter());
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("huffman_glue", textConsumer,
            "На этом шаге необходимо объединить узлы");
    }

    codeGetter() {
        return "huffman_glue";
    }

    parentNodeGetter() {
        return this.#parentNode;
    }

    updateSelected(node) {
        node.selectedSetter(!node.selectedGetter());
        if (node.selectedGetter()) {
            this.#lastSelected = node;
        }

        this.#userSelectedNodes = this.#controller.huffmanTreeGetter().getSelectedNodes();
        if (this.#userSelectedNodes.length > 2) {
            let n;
            if (this.#userSelectedNodes[0] !== this.#lastSelected) {
                n = this.#userSelectedNodes.shift();
            } else {
                n = this.#userSelectedNodes.pop();
            }

            n.selectedSetter(false);
            n.viewGetter().update();
        }
    }
}