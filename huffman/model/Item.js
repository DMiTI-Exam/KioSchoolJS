import { ItemView } from "../view/ItemView.js";

export class Item {
    #symbol;
    #deleted = false;
    #fixed = false;
    #view;

    constructor(symbol) {
        this.#view = new ItemView(this);
        this.#symbol = symbol;
    }

    symbolGetter() {
        return this.#symbol;
    }

    deletedGetter() {
        return this.#deleted;
    }

    deletedSetter(value) {
        this.#deleted = value;
    }

    viewGetter() {
        return this.#view;
    }

    fixedGetter() {
        return this.#fixed;
    }

    fixedSetter(value) {
        this.#fixed = value;
    }
}