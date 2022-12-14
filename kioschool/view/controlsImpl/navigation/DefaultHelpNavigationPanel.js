import { DefaultHelpNavigationButtons } from "../../../gui/DefaultHelpNavigationButtons.js";
import { HelpManager } from "../../../controller/HelpManager.js";

/**
 * Пеналь навигации, предоставляемая платформой по умолчанию
 */
export class DefaultHelpNavigationPanel extends createjs.Container {
    HEIGHT = 80;

    /**
     * Дефолтное представление
     */
    #buttons = new DefaultHelpNavigationButtons();

    /**
     * Конструктор, инициализирует слушателей кнопок смены режимов
     */
    constructor(width, height, sprite) {
        super();

        this.addChild(this.#buttons);
        this.#buttons.x = (width - this.#buttons.getBounds().width) / 2;
        this.#buttons.y = (height - this.#buttons.getBounds().height) / 2;

        sprite.addChild(HelpManager.instanceGetter().getPage());

        this.updateButtons();

        let self = this;

        this.#buttons.next_btn.addEventListener("click", function (event) {
            sprite.removeChildAt(0);
            sprite.addChild(HelpManager.instanceGetter().nextPage());
            self.updateButtons();
        });

        this.#buttons.prev_btn.addEventListener("click", function (event) {
            sprite.removeChildAt(0);
            sprite.addChild(HelpManager.instanceGetter().previousPage());
            self.updateButtons();
        });
    }

    updateButtons() {
        this.#buttons.help_txt.text = (HelpManager.instanceGetter().pageNumberGetter() + 1) + "/" +
            HelpManager.instanceGetter().pageAmountGetter();

        this.#buttons.prevButtonHelper.enabled = HelpManager.instanceGetter().hasPrevious();
        this.#buttons.prev_btn.mouseEnabled = HelpManager.instanceGetter().hasPrevious();
        if (this.#buttons.prevButtonHelper.enabled) {
            this.#buttons.prev_btn.alpha = 1;
            this.#buttons.prev_btn.gotoAndPlay("source");
        } else {
            this.#buttons.prev_btn.alpha = 0.5;
        }

        this.#buttons.nextButtonHelper.enabled = HelpManager.instanceGetter().hasNext();
        this.#buttons.next_btn.mouseEnabled = HelpManager.instanceGetter().hasNext();
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