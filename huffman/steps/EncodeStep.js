import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { EncodedTreeView } from "../view/EncodedTreeView.js";
import { FinalStep } from "./FinalStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { TextField } from "../../additionalComponents/TextField.js";

export class EncodeStep extends AbstractStep {
    #controller = HuffmanController.instanceGetter();
    #stepItems = [];
    #symbol;
    #userSymbol;

    getView() {
        return new EncodedTreeView();
    }

    next() {
        if (this.#controller.isAllItemDeleted()) {
            return new FinalStep();
        } else {
            return new EncodeStep();
        }
    }

    oracle() {
        this.#controller.buildItems();
        this.#stepItems = [];
        let buffer = "";
        for (let i = 0; i < this.#controller.itemsGetter().length; i++) {
            if (this.#controller.itemsGetter()[i].deletedGetter()) {
                continue;
            }

            buffer += this.#controller.itemsGetter()[i].symbolGetter();
            this.#controller.itemsGetter()[i].deletedSetter(true);
            this.#controller.itemsGetter()[i].fixedSetter(true);
            this.#stepItems.push(this.#controller.itemsGetter()[i]);
            this.#symbol = this.#controller.huffmanTreeGetter().getSymbol(buffer);
            if (this.#symbol != null) {
                break;
            }
        }

        if (this.#symbol != null) {
            let encodedWord = this.#controller.encodedWordGetter();
            this.#controller.encodedWordSetter(encodedWord + this.#symbol);
        }
    }

    checkInput(textConsumer = null) {
        this.#controller.buildItems();
        let temp = [];

        let userDeleted = this.#controller.getDeletedAndNotFixed();

        let buffer = "";
        let correctSymbol = "";
        for (let i = 0; i < this.#controller.itemsGetter().length; i++) {
            if (this.#controller.itemsGetter()[i].fixedGetter()) {
                continue;
            }

            buffer += this.#controller.itemsGetter()[i].symbolGetter();

            temp.push(this.#controller.itemsGetter()[i]);

            correctSymbol = this.#controller.huffmanTreeGetter().getSymbol(buffer);
            if (correctSymbol != null) {
                break;
            }
        }

        let err = null;

        if (correctSymbol !== this.#userSymbol) {
            err = "Неверно расшифрован символ";
        }

        if (!this.#controller.equal(temp, userDeleted)) {
            err = "Неверно опознана кодовая последовательность";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_encodestep_error", textConsumer, err);
            return err;
        }

        this.#stepItems = userDeleted;
        for (let item of this.#stepItems) {
            item.fixedSetter(true);
        }

        this.#symbol = this.#userSymbol;
        if (this.#symbol != null) {
            let encodedWord = this.#controller.encodedWordGetter();
            this.#controller.encodedWordSetter(encodedWord + this.#symbol);
        }

        if (err != null) {
            CommentManager.instanceGetter().getHelp("huffamn_encodestep_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        TextField.removeInputsByName("encodedTreeView");
        TextField.hideByName("itemView");

        for (let i = 0; i < this.#controller.itemsGetter().length; i++) {
            if (!this.#controller.itemsGetter()[i].fixedGetter()) {
                this.#controller.itemsGetter()[i].deletedSetter(false);
            }
        }
    }

    antiOracle() {
        for (let item of this.#stepItems) {
            item.deletedSetter(false);
            item.fixedSetter(false);
        }

        if (this.#symbol != null) {
            this.#controller.encodedWordSetter(this.#controller.encodedWordGetter()
                .substring(0, this.#controller.encodedWordGetter().length - this.#symbol.length));
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("huffman_encode", textConsumer,
            "Расшифруйте слово");
    }

    codeGetter() {
        return "huffman_encode";
    }

    userSymbolSetter(userSymbol) {
        this.#userSymbol = userSymbol;
    }

    updateSelectedItem(item) {
        item.deletedSetter(!item.deletedGetter());
    }
}