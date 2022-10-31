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
    idGetter() {
        return this.#id;
    }

    /**
     * Получает источник - первая инцидентная вершина
     */
    sourceGetter() {
        return this.#source;
    }

    /**
     * Устанавливает источник - первая инцидентная вершина
     */
    sourceSetter(value) {
        this.#source = value;
    }

    /**
     * Получает приемник - вторая инцидентная вершина
     */
    targetGetter() {
        return this.#target;
    }

    /**
     * Устанавливает приемник - вторая инцидентная вершина
     */
    targetSetter(value) {
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
    viewSetter(value) {
        this.#view = value;
    }
}