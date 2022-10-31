import { IDisplayableComponent } from './IDisplayableComponent.js'

/**
 * Интерфейс панели для комментариев
 */
export class ICommentPanel extends IDisplayableComponent {
    constructor() {
        super();
        if (this.constructor === ICommentPanel) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Получает потребителя текста комментария
     */
    commentGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Получает потребителя текста ошибки
     */
    errorGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}