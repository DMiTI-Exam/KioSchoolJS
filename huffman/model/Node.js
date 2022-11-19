import { NodeView } from "../view/NodeView.js";

/**
 * Class represents tree node which contains symbols, probability, code and level in tree
 */
export class Node {
    #view;
    #symbols;
    #code;
    #probability;
    #level;
    #parent;
    #firstChild;
    #secondChild;
    #selected;
    #x;
    #y;

    constructor(symbols, probability, level = 0, code = "") {
        this.#symbols = symbols;
        this.#code = code;
        this.#probability = probability;
        this.#level = level;
        this.#view = new NodeView(this);
    }

    symbolsGetter() {
        return this.#symbols;
    }

    codeGetter() {
        return this.#code;
    }

    probabilityGetter() {
        return this.#probability;
    }

    levelGetter() {
        return this.#level;
    }

    probabilitySetter(value) {
        this.#probability = value;
    }

    codeSetter(value) {
        this.#code = value;
    }

    parentGetter() {
        return this.#parent;
    }

    parentSetter(value) {
        this.#parent = value;
    }

    selectedGetter() {
        return this.#selected;
    }

    selectedSetter(value) {
        this.#selected = value;
    }

    viewGetter() {
        return this.#view;
    }

    viewSetter(value) {
        this.#view = value;
    }

    xGetter() {
        return this.#x;
    }

    xSetter(value) {
        this.#x = value;
    }

    yGetter() {
        return this.#y;
    }

    ySetter(value) {
        this.#y = value;
    }

    getProbability() {
        return this.#firstChild.probabilityGetter() + this.#secondChild.probabilityGetter();
    }

    firstChildGetter() {
        return this.#firstChild;
    }

    secondChildGetter() {
        return this.#secondChild;
    }

    firstChildSetter(firstChild) {
        this.#firstChild = firstChild;
    }

    secondChildSetter(secondChild) {
        this.#secondChild = secondChild;
    }
}