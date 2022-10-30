import { ITextConsumer } from './ITextConsumer.js'

export class SimpleTextConsumer extends ITextConsumer {
    #text;

    constructor() {
        super();
    }

    setText(text) {
        this.#text = text;
    }

    getText() {
        return this.#text;
    }
}