import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { TreeView } from "../view/TreeView.js";
import { BuildCodeStep } from "./BuildCodeStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { CalcWeightStep } from "./CalcWeightStep.js";

export class CalcCodeStep extends AbstractStep {
    #controller = HuffmanController.instanceGetter();
    #nodes = [];

    getView() {
        return new TreeView();
    }

    next() {
        if (this.#controller.huffmanTreeGetter().isAllCoded()) {
            return new BuildCodeStep();
        } else {
            return new CalcCodeStep();
        }
    }

    oracle() {
        this.#nodes = [];
        if (ManipulatorManager.instanceGetter().previousStepGetter() instanceof CalcWeightStep) {
            for (let i = 0; i < this.#controller.huffmanTreeGetter().nodesGetter().length; i++) {
                if (this.#controller.huffmanTreeGetter().nodesGetter()[i].parentGetter() == null) {
                    this.#nodes.push(this.#controller.huffmanTreeGetter().nodesGetter()[i]);
                    if (this.#nodes.length === 1) {
                        this.#controller.huffmanTreeGetter().nodesGetter()[i].codeSetter("0");
                    } else {
                        this.#controller.huffmanTreeGetter().nodesGetter()[i].codeSetter("1");
                    }
                }
            }

            this.#controller.leftCodeSetter(this.#nodes[0].xGetter() < this.#nodes[1].xGetter() ?
                this.#nodes[0].codeGetter() : this.#nodes[1].codeGetter());
        } else {
            let myNodes = ManipulatorManager.instanceGetter().previousStepGetter().#nodes;
            for (let i = 0; i < myNodes.length; i++) {
                if (myNodes[i].firstChildGetter() != null) {
                    myNodes[i].firstChildGetter().codeSetter(myNodes[i].codeGetter() +
                        this.#controller.leftCodeGetter());
                    this.#nodes.push(myNodes[i].firstChildGetter());
                }

                if (myNodes[i].secondChildGetter() != null) {
                    myNodes[i].secondChildGetter().codeSetter(myNodes[i].codeGetter() +
                        this.#controller.rightCodeGetter());
                    this.#nodes.push(myNodes[i].secondChildGetter());
                }
            }
        }
    }

    checkInput(textConsumer = null) {
        let err = null;
        this.#nodes = [];

        if (ManipulatorManager.instanceGetter().previousStepGetter() instanceof  CalcWeightStep) {
            for (let i = 0; i < this.#controller.huffmanTreeGetter().nodesGetter().length; i++) {
                if (this.#controller.huffmanTreeGetter().nodesGetter()[i].parentGetter() == null) {
                    this.#nodes.push(this.#controller.huffmanTreeGetter().nodesGetter()[i]);
                }
            }

            if ((this.#nodes[0].codeGetter() === "0" && this.#nodes[1].codeGetter() === "1") ||
                (this.#nodes[0].codeGetter() === "1" && this.#nodes[1].codeGetter() === "0")) {
                this.#controller.leftCodeSetter(this.#nodes[0].xGetter() < this.#nodes[1].xGetter() ?
                    this.#nodes[0].codeGetter() : this.#nodes[1].codeGetter());
            } else {
                err = "Неверно указаны веса";
                this.#controller.leftCodeSetter("0");
            }
        } else {
            let myNodes = ManipulatorManager.instanceGetter().previousStepGetter().#nodes;
            for (let i = 0; i < myNodes.length; i++) {
                if (myNodes[i].firstChildGetter() != null && myNodes[i].secondChildGetter() != null) {
                    if (!((myNodes[i].firstChildGetter().codeGetter() === myNodes[i].codeGetter() + this.#controller.leftCodeGetter() &&
                        myNodes[i].secondChildGetter().codeGetter() === myNodes[i].codeGetter() + this.#controller.rightCodeGetter()) ||
                        (myNodes[i].firstChildGetter().codeGetter() === myNodes[i].codeGetter() + this.#controller.rightCodeGetter() &&
                            myNodes[i].secondChildGetter().codeGetter() === myNodes[i].codeGetter() + this.#controller.leftCodeGetter()))) {
                        err = "Неверно указаны веса";
                    }

                    this.#nodes.push(myNodes[i].firstChildGetter());
                    this.#nodes.push(myNodes[i].secondChildGetter());
                }
            }
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING && err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calccode_error", textConsumer, err);
            return err;
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calccode_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        if (ManipulatorManager.instanceGetter().previousStepGetter() instanceof CalcWeightStep) {
            for (let i = 0; i < this.#controller.huffmanTreeGetter().nodesGetter().length; i++) {
                if (this.#controller.huffmanTreeGetter().nodesGetter()[i].parentGetter() == null) {
                    this.#controller.huffmanTreeGetter().nodesGetter()[i].codeSetter("");
                }
            }
        } else {
            let myNodes = ManipulatorManager.instanceGetter().previousStepGetter().#nodes;
            for (let i = 0; i < myNodes.length; i++) {
                if (myNodes[i].firstChildGetter() != null) {
                    myNodes[i].firstChildGetter().codeSetter("");
                }

                if (myNodes[i].secondChildGetter() != null) {
                    myNodes[i].secondChildGetter().codeSetter("");
                }
            }
        }
    }

    antiOracle() {
        for (let node of this.#nodes) {
            node.codeSetter("");
        }
    }

    update() {
        this.#controller.regimeChanged(ManipulatorManager.instanceGetter().regimeGetter());
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("huffman_calccode", textConsumer,
            "На этом шаге необходимо указать код узлов");
    }

    codeGetter() {
        return "huffman_calccode";
    }
}