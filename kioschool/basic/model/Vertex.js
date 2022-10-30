import { IdGenerator } from "../../util/IdGenerator.js";

/**
 * Вершина графа, содержит уникальный идентификатор и объект отображения
 * Родитель для всех вершин графовых моделей
 */
export class Vertex {
    /**
     * Идентификатор
     */
    #id;

    /**
     * Представлении вершины
     */
    #views = [];

    /**
     * Метка - используется для служеюных целей - обходы и т.д.
     */
    #labeled = false;

    constructor() {
        this.#id = IdGenerator.getNewId();
    }

    /**
     * Получает идентификатор
     */
    getId() {
        return this.#id;
    }

    isLabeled() {
        return this.#labeled;
    }

    setLabeled(labeled) {
        this.#labeled = labeled;
    }

    updateViews() {
        for (let view of this.#views) {
            view.update();
        }
    }

    /**
     * Получает представление
     */
    getViews() {
        return this.#views;
    }

    /**
     * Устанавливает представление
     */
    addView(value) {
        this.#views.push(value);
    }
}