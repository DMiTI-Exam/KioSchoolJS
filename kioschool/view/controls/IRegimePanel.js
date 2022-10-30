import { IDisplayableComponent } from "./IDisplayableComponent.js";

/**
 * Интерфейс панели управления режимами
 */
export class IRegimePanel extends IDisplayableComponent {
    constructor() {
        super();
        if (this.constructor === IRegimePanel) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Обрабатывает смену режимов
     */
    regimeChanged(regime) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}