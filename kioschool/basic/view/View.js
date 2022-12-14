/**
 * Интерфейс представления
 * Объявляет единственный метод, который следует вызывать при изменении модели
 */
export class View extends createjs.Container {
    constructor() {
        super();

        if (this.constructor === View) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    update() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}