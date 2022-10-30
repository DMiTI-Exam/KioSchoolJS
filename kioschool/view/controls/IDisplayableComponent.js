/**
 * Интерфейс визуального элемента управления
 */
export class IDisplayableComponent extends createjs.Container {
    constructor() {
        super();

        if (this.constructor === IDisplayableComponent) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Получает представления для отображения на сцене
     */
    getView() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}