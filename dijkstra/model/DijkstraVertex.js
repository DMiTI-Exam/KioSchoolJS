import { Vertex } from "../../kioschool/basic/model/Vertex.js";

/**
 * Вершина графа для алгоритма Дейкстры
 *
 * Дополнительно содержит признак включенности в дерево и коррестировки
 */
export class DijkstraVertex extends Vertex {
    /**
     * Используется для обозначения бесконечной стоимости
     */
    static INFINITY_COST = 10000;

    /**
     * Признак того, что вершина включена в дерево
     */
    #inTree;

    /**
     * Имя вершины
     */
    #name;

    /**
     * Признак того, что вершина скорректирована
     */
    #selected;

    /**
     * Признак того, что вершина overed
     */
    #over;

    /**
     * Вес вершины (стоимость кратчайшего пути до нее)
     */
    #weight;

    constructor() {
        super();
        this.inTreeSetter(false);
        this.selectedSetter(false);
        this.#weight = DijkstraVertex.INFINITY_COST;
    }

    /**
     * Получает вес
     */
    weightGetter() {
        return this.#weight;
    }

    /**
     * Получает название
     */
    nameGetter() {
        return this.#name;
    }

    /**
     * Получает признак того, что вершина включена в дерево
     */
    inTreeGetter() {
        return this.#inTree;
    }

    /**
     * Получает признак того, что вершина скорректирована
     */
    selectedGetter() {
        return this.#selected;
    }

    overGetter() {
        return this.#over;
    }

    /**
     * Устанавливает название
     */
    nameSetter(value) {
        this.#name = value;
        this.updateViews();
    }


    overSetter(value) {
        this.#over = value;
        this.updateViews();
    }

    /**
     * Устанавливает признак того, что вершина включена в дерево
     */
    inTreeSetter(value) {
        this.#inTree = value;
        this.updateViews();
    }


    /**
     * Устанавливает признак того, что вершина скоректирована
     */
    selectedSetter(value) {
        this.#selected = value;
        this.updateViews();
    }

    /**
     * Устанавливает вес
     */
    weightSetter(value) {
        this.#weight = value;
        this.updateViews();
    }
}
