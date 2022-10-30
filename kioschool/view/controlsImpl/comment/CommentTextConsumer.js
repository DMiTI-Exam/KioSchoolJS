import { ITextConsumer } from "../../ITextConsumer.js";

export class CommentTextConsumer extends ITextConsumer {
    // createjs.Text (of cause immutable)
    #textField;

    constructor(view) {
        super();

        this.#textField = view;
    }

    setText(comment) {
        this.#textField.text = comment;
    }
}