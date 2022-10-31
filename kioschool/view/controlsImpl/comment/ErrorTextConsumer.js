import { ITextConsumer } from "../../ITextConsumer.js";

export class ErrorTextConsumer extends ITextConsumer {
    // createjs.Text (of cause immutable)
    #textField;

    constructor(view) {
        super();

        this.#textField = view;
    }

    textSetter(comment) {
        this.#textField.text = comment;
    }
}