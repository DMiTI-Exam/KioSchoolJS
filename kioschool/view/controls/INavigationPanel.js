import { IDisplayableComponent } from "./IDisplayableComponent.js";

/**
 * Интерфейс панели навиации
 */
export class INavigationPanel extends IDisplayableComponent {
    constructor() {
        super();
        if (this.constructor === INavigationPanel) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Обрабатывает смену режимов
     */
    regimeChanged(regime) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Обрабатывает смену шагов
     */
    stepChanged(isFirst, step) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}