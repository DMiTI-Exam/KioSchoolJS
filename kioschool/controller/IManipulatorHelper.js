/**
 * Вторичный контроллер - уникальный для каждого манипулятора
 */
export class IManipulatorHelper {
    constructor() {
        if (this.constructor === IManipulatorHelper) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Инициализация - выполняется при перезапуске алгоритма
     * Выполняется генерация данных, установка первого шага и т.д.
     */
    init() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Оповещение о смене режима
     */
    regimeChanged(regime) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Получает первый шаг
     */
    firstStepGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Определяет способ перехода в полноэкранный режим,
     * для приложения, не требующих ввода в клавиатуры, возможен переход в full screen
     * для других - full screen interactive (будет показываться диалоговое собщение flash)
     * @return
     */
    needKeyboard() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    idGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    redrawInFinalGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    redraw(workspace) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}