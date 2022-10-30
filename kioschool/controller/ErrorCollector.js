import { ITextConsumer } from "../view/ITextConsumer.js";

export class ErrorCollector extends ITextConsumer {
    /**
     * История ошибок дял режима контроля
     */
    #errorsHistory = [];

    constructor() {
        super();
    }

    getLength() {
        return this.#errorsHistory.length;
    }

    setText(text) {
        this.#errorsHistory.push(text);
        console.log("Errors history length: " + this.#errorsHistory.length);
    }

    pop() {
        this.#errorsHistory.pop();
    }

    clean() {
        this.#errorsHistory = [];
    }
}