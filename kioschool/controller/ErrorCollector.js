import { ITextConsumer } from "../view/ITextConsumer.js";

export class ErrorCollector extends ITextConsumer {
    /**
     * История ошибок дял режима контроля
     */
    #errorsHistory = [];

    constructor() {
        super();
    }

    lengthGetter() {
        return this.#errorsHistory.length;
    }

    textSetter(text) {
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