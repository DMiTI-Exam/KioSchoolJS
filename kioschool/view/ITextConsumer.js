export class ITextConsumer {
    constructor() {
        if (this.constructor === ITextConsumer) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Устанавливает сообщение
     */
    textSetter(text) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}