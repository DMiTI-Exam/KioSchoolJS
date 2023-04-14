import { Edge } from "../../kioschool/basic/model/Edge.js";

export class EulerEdge extends Edge {
    #selected = false;
    #lastSelected = false;
    #inverse = false;

    /**
     * Конструктор, инициализирует ребро как не включенное в дерево
     */
    constructor(source, target) {
        super();

        this.sourceSetter(source);
        this.targetSetter(target);
    }

    getAnother(vertex) {
        if (this.sourceGetter() === vertex) {
            return this.targetGetter();
        } else {
            return this.sourceGetter();
        }
    }

    selectedGetter() {
        return this.#selected;
    }

    selectedSetter(value) {
        this.#selected = value;
    }

    lastSelectedGetter() {
        return this.#lastSelected;
    }

    lastSelectedSetter(value) {
        this.#lastSelected = value;
    }

    inverseGetter() {
        return this.#inverse;
    }

    inverseSetter(value) {
        this.#inverse = value;
    }
}