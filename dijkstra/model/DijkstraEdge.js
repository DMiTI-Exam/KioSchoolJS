import { Edge } from "../../kioschool/basic/model/Edge.js";

/**
 * Ребро графа для алгоритма Дейкстры
 *
 * Каждое ребро дополнительно содержит признак выделенности и  включенности в дерево
 */
export class DijkstraEdge extends Edge {

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
        this.inTreeSetter(false);
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
        return this.#weight
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