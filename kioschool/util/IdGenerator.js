/**
 * Класс утилит, используется для генерации уникальных идентификаторов
 */
export class IdGenerator {
    static #currentId = 0;

    constructor() {
    }

    static getNewId() {
        this.#currentId++;
        return this.#currentId;
    }
}