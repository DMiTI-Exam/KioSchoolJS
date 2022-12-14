import { INavigationPanel } from "../../controls/INavigationPanel.js";
import { DefaultNavigationButtons } from "../../../gui/DefaultNavigationButtons.js";
import { DefaultCheckButtons } from "../../../gui/DefaultCheckButtons.js";
import { ManipulatorManager } from "../../../controller/ManipulatorManager.js";

/**
 * Пеналь навигации, предоставляемая платформой по умолчанию
 */
export class DefaultNavigationPanel extends INavigationPanel {
    /**
     * Дефолтное представление
     */
    #buttons = new DefaultNavigationButtons();

    /**
     * Дефолтное представление
     */
    #checkButtons = new DefaultCheckButtons();

    /**
     * Конструктор, инициализирует слушателей кнопок смены режимов
     */
    constructor(width, height, helpWidth) {
        super();

        this.addChild(this.#buttons);
        this.#buttons.x = (width - helpWidth - this.#buttons.getBounds().width) / 2;
        this.#buttons.y = (height - this.#buttons.getBounds().height) / 2;

        this.addChild(this.#checkButtons);
        this.#checkButtons.y = (height - this.#checkButtons.getBounds().height) / 2;
        this.#checkButtons.x = (width - this.#checkButtons.getBounds().width - this.#checkButtons.y);

        this.#buttons.next_btn.addEventListener("click", function (event) {
            ManipulatorManager.instanceGetter().nextClick();
        });

        this.#buttons.prev_btn.addEventListener("click", function (event) {
            ManipulatorManager.instanceGetter().backClick();
        });

        this.#checkButtons.reset_btn.addEventListener("click", function (event) {
            ManipulatorManager.instanceGetter().initController();
        });

        this.#checkButtons.send_btn.addEventListener("click", function (event) {
            ManipulatorManager.instanceGetter().submitSolution();
        });
    }

    enableSubmit(enable) {
        this.#checkButtons.sendButtonHelper.enabled = enable;
        if (enable) {
            this.#checkButtons.send_btn.alpha = 1;
            this.#checkButtons.send_btn.gotoAndPlay("source");
        } else {
            this.#checkButtons.send_btn.alpha = 0.5;
        }
    }

    regimeChanged(regime) {
        this.#checkButtons.send_btn.visible = regime === ManipulatorManager.REGIME_CONTROL;
    }

    stepChanged(isFirst, step) {
        this.#buttons.prevButtonHelper.enabled = !isFirst;
        this.#buttons.prev_btn.mouseEnabled = !isFirst;
        if (this.#buttons.prevButtonHelper.enabled) {
            this.#buttons.prev_btn.alpha = 1;
            this.#buttons.prev_btn.gotoAndPlay("source");
        } else {
            this.#buttons.prev_btn.alpha = 0.5;
        }

        this.#buttons.nextButtonHelper.enabled = step.next() != null;
        this.#buttons.next_btn.mouseEnabled = step.next() != null;
        if (this.#buttons.nextButtonHelper.enabled) {
            this.#buttons.next_btn.alpha = 1;
            this.#buttons.next_btn.gotoAndPlay("source");
        } else {
            this.#buttons.next_btn.alpha = 0.5;
        }
    }

    getView() {
        return this;
    }
}