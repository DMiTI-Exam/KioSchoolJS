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
    static instanceGetter() {
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
        if (ManipulatorManager.instanceGetter().currentStepGetter().next() != null) {
            ManipulatorManager.instanceGetter().nextClick();
        } else {
            ManipulatorManager.instanceGetter().initController();
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
        if (this.#forward && ManipulatorManager.instanceGetter().currentStepGetter().next() != null) {
            ManipulatorManager.instanceGetter().nextClick();
        } else if (!this.#forward && !ManipulatorManager.instanceGetter().isStackOfStepEmpty()) {
            ManipulatorManager.instanceGetter().backClick();
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