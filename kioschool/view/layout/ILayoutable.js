/**
 * Интерфейс контейнера с менеджером компоновки
 * Используется для рекурсивной обработки события изменения размера в ComponentLayout
 */
export class ILayoutable extends createjs.Container {
    constructor() {
        super();

        if (this.constructor === ILayoutable) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Получает менеджера компоновки
     */
    getLayout() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}