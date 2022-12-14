import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CodedTreeView } from "../view/CodedTreeView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { EncodeStep } from "./EncodeStep.js";
import { TextField } from "../../additionalComponents/TextField.js";

export class BuildCodeStep extends AbstractStep {
    #controller = HuffmanController.instanceGetter();
    #userCode = "";

    getView() {
        return new CodedTreeView();
    }

    next() {
        return new EncodeStep();
    }

    oracle() {
        for (let i = 0; i < this.#controller.firstWordGetter().length; i++) {
            let code = this.#controller.firstWordCodeGetter();
            this.#controller.firstWordCodeSetter(code + this.#controller.huffmanTreeGetter()
                .getCode(this.#controller.firstWordGetter().charAt(i)));
        }
    }

    antiOracle() {
        this.#controller.firstWordCodeSetter("");
    }

    checkInput(textConsumer = null) {
        let err = null;
        let correctCode = "";
        for (let i = 0; i < this.#controller.firstWordGetter().length; i++) {
            correctCode += this.#controller.huffmanTreeGetter().getCode(this.#controller.firstWordGetter().charAt(i));
        }

        if (correctCode !== this.userCodeGetter()) {
            err = "Неверный код";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calccode_error", textConsumer, err);
            return err;
        }

        this.#controller.firstWordCodeSetter(this.#userCode);

        if (err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_calccode_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        TextField.removeInputsByName("codedTreeView");
        this.#controller.firstWordCodeSetter("");

        for (let node of this.#controller.huffmanTreeGetter().nodesGetter()) {
            node.viewGetter().disableFields();
        }
    }

    update() {
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("huffman_buildcode", textConsumer,
            "Закодируйте слово");
    }

    codeGetter() {
        return "huffman_buildcode";
    }

    userCodeGetter() {
        return this.#userCode;
    }

    userCodeSetter(value) {
        this.#userCode = value;
    }
}