import { ITextConsumer } from './ITextConsumer.js'

export class SimpleTextConsumer extends ITextConsumer {
    #text;

    constructor() {
        super();
    }

    textSetter(text) {
        this.#text = text;
    }

    textGetter() {
        return this.#text;
    }
}