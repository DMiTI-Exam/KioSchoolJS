import { Edge } from "../../kioschool/basic/model/Edge.js";

/**
 * Ребро графа для алгоритма Прима
 *
 * Каждое ребро дополнительно содержит признак выделенности и включенности в дерево
 */
export class PrimEdge extends Edge {
    /**
     * Признак выделенности
     */
    #selected;

    /**
     * Признак того, что ребро включено в дерево
     */
    #inTree;

    /**
     * Стоимость ребра
     */
    #weight;

    /**
     * Конструктор, инициализирует ребро как не включенное в дерево
     */
    constructor() {
        super();
        this.selectedSetter(false);
        this.inTreeSetter(false);
    }

    /**
     * Получает признак включенности в дерево
     */
    selectedGetter() {
        return this.#selected;
    }

    /**
     * Устанавливает признак включенности в дерево
     */
    selectedSetter(value) {
        this.#selected = value;
        if (this.getView() != null) {
            this.getView().update();
        }
    }

    /**
     * Получает признак того, что ребро включено в дерево
     */
    inTreeGetter() {
        return this.#inTree;
    }

    /**
     * Устанавливает признак того, что ребро включено в дерево
     */
    inTreeSetter(value) {
        this.#inTree = value;
        if (this.getView() != null) {
            this.getView().update();
        }
    }

    /**
     * Получает вес
     */
    weightGetter() {
        return this.#weight;
    }

    /**
     * Устанавливает вес
     */
    weightSetter(value) {
        this.#weight = value;
        if (this.getView() != null) {
            this.getView().update();
        }
    }
}