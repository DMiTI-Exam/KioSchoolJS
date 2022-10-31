/**
 * Интерфейс шага алгоритма
 */
export class AbstractStep {
    constructor() {
        if (this.constructor === AbstractStep) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    /**
     * Призна корректности
     */
    #correct = true;

    correctGetter() {
        return this.#correct;
    }

    correctSetter(cor) {
        this.#correct = cor;
    }

    /**
     * Возвращает код
     */
    codeGetter() {
        throw new Error("");
    }

    /**
     * Получает следующий шаг
     */
    next() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Решает шаг - выполняется в режиме демонстрации при переходе на следующий шаг
     */
    oracle() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Проверяет действия пользователя на данном шаге - выполняется в режиме тренировки и контроля при переходе на следующий шаг
     */
    checkInput(textConsumer = null) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Откат действия данного шага - выполняется при переходе на предыдущий шаг
     */
    restore() {

    }

    /**
     * Откатывает действия, сделанные на данном шаге - выполняется при переходе на этот шаг при прокрутке назад
     */
    antiOracle() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Выполняется при переходе на данный шаг как при прокрутке вперед, так и при прокрутке назад
     */
    update() {

    }

    /**
     * Возвращает представления для данного шага - будет отображено на панели
     */
    getView() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Возвращает комментарий для данного шага
     */
    setComment(textConsumer) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}