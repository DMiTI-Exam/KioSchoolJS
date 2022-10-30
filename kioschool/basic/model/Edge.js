import { IdGenerator } from "../../util/IdGenerator.js";

/**
 * Ребро графа, содержит уникальный идентификатор, смежные вершины и объект представления
 * Родитель для всех ребер графовых моделей
 */
export class Edge {
    /**
     * Идентификатор
     */
    #id;

    /**
     * Источник - первая инцидентная вершина
     */
    #source;

    /**
     * Приемник- вторая инцидентная вершины
     */
    #target;

    /**
     * Представление
     */
    #view;

    constructor() {
        this.#id = IdGenerator.getNewId();
    }

    /**
     * Получает идентификатор
     */
    getId() {
        return this.#id;
    }

    /**
     * Получает источник - первая инцидентная вершина
     */
    getSource() {
        return this.#source;
    }

    /**
     * Устанавливает источник - первая инцидентная вершина
     */
    setSource(value) {
        this.#source = value;
    }

    /**
     * Получает приемник - вторая инцидентная вершина
     */
    getTarget() {
        return this.#target;
    }

    /**
     * Устанавливает приемник - вторая инцидентная вершина
     */
    setTarget(value) {
        this.#target = value;
    }

    /**
     * Получает представление
     */
    getView() {
        return this.#view;
    }

    /**
     * Устанавливает представления
     */
    setView(value) {
        this.#view = value;
    }
}