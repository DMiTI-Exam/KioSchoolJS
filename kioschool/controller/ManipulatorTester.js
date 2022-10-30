import { ManipulatorManager } from "./ManipulatorManager.js";

/**
 * Автоматический тестировщик
 * Сингельтон
 */
export class ManipulatorTester {
    /**
     * Сингельтон
     */
    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    #timer;
    #attemptCount;
    #amountOfAttempt;
    #forward;

    /**
     * Получает экземпляр
     */
    static getInstance() {
        if (ManipulatorTester.#instance == null) {
            ManipulatorTester.#canConstruct = true;
            ManipulatorTester.#instance = new ManipulatorTester();
            ManipulatorTester.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        if (!ManipulatorTester.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    forwardTest(amountOfAttempt, delay) {
        this.#amountOfAttempt = amountOfAttempt;

        let tween = createjs.Tween.get(this);
        while (this.#attemptCount < this.#amountOfAttempt) {
            tween.wait(delay).call(this.#forwardAction);
        }
    }

    #forwardAction() {
        if (ManipulatorManager.getInstance().getCurrentStep().next() != null) {
            ManipulatorManager.getInstance().nextClick();
        } else {
            ManipulatorManager.getInstance().initController();
            this.#attemptCount++;
            console.log(this.#attemptCount + " has finished");
        }
    }

    forwardBackwardTest(amountOfAttempt, delay) {
        this.#amountOfAttempt = amountOfAttempt;
        this.#forward = true;

        let tween = createjs.Tween.get(this);
        while (this.#attemptCount < this.#amountOfAttempt) {
            tween.wait(delay).call(this.#forwardBackwardAction);
        }
    }

    #forwardBackwardAction() {
        if (this.#forward && ManipulatorManager.getInstance().getCurrentStep().next() != null) {
            ManipulatorManager.getInstance().nextClick();
        } else if (!this.#forward && !ManipulatorManager.getInstance().isStackOfStepEmpty()) {
            ManipulatorManager.getInstance().backClick();
        } else {
            if (this.#forward) {
                this.#forward = false;
            } else {
                this.#forward = true;
                this.#attemptCount++;
                console.log(this.#attemptCount + " has finished");
            }
        }
    }
}