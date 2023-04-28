import { Edge } from '../../kioschool/basic/model/Edge.js'

/**
 * Ребро графа для алгоритма построения максимального парасочетания
 * 
 * Каждое ребро дополнительно содержит направление
 */
export class MatchingEdge extends Edge {
    #deleted = false;
    #switched = false;
    #approved = false;
    #selected = false;
    #lastSelected = false;

    /**
     * Конструктор, инициализирует ребро как не включенное в дерево
     */
    constructor(source, target) {
        super();

        this.sourceSetter(source);
        this.targetSetter(target);
    }

    deletedGetter() {
        return this.#deleted;
    }

    deletedSetter(value) {
        this.#deleted = value;
    }

    switchedGetter() {
        return this.#switched;
    }

    switchedSetter(value) {
        this.#switched = value;
    }

    getAnother (vertex) {
        if (this.sourceGetter() === vertex) {
            return this.targetGetter();
        } else {
            return this.sourceGetter();
        }
    }

    approvedGetter() {
        return this.#approved;
    }

    approvedSetter(value) {
        this.#approved = value;
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
}