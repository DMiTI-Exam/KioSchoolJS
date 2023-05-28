import { Vertex } from "../../kioschool/basic/model/Vertex.js";

/**
 * Вершина графа для алгоритма Прима
 *
 * Дополнительно содержит признак включенности в дерево
 *
 */
export class PrimVertex extends Vertex {
    /**
     * Признак того, что вершина включена в дерево
     */
    #inTree;

    constructor() {
        super();
        this.inTreeSetter(false);
    }

    /**
     * Получает признак того, что вершина включена в дерево
     */
    inTreeGetter() {
        return this.#inTree;
    }

    /**
     * Устанавливает признак того, что вершина включена в дерево
     */
    inTreeSetter(value) {
        this.#inTree = value;
        this.updateViews();
    }
}