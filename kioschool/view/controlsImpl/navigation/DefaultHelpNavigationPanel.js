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

        sprite.addChild(HelpManager.getInstance().getPage());

        this.updateButtons();

        let self = this;

        this.#buttons.next_btn.addEventListener("click", function (event) {
            sprite.removeChildAt(0);
            sprite.addChild(HelpManager.getInstance().nextPage());
            self.updateButtons();
        });

        this.#buttons.prev_btn.addEventListener("click", function (event) {
            sprite.removeChildAt(0);
            sprite.addChild(HelpManager.getInstance().previousPage());
            self.updateButtons();
        });
    }

    updateButtons() {
        this.#buttons.help_txt.text = (HelpManager.getInstance().getPageNumber() + 1) + "/" +
            HelpManager.getInstance().getPageAmount();

        this.#buttons.prevButtonHelper.enabled = HelpManager.getInstance().hasPrevious();
        this.#buttons.prev_btn.mouseEnabled = HelpManager.getInstance().hasPrevious();
        if (this.#buttons.prevButtonHelper.enabled) {
            this.#buttons.prev_btn.alpha = 1;
        } else {
            this.#buttons.prev_btn.alpha = 0.5;
        }

        this.#buttons.nextButtonHelper.enabled = HelpManager.getInstance().hasNext();
        this.#buttons.next_btn.mouseEnabled = HelpManager.getInstance().hasNext();
        if (this.#buttons.nextButtonHelper.enabled) {
            this.#buttons.next_btn.alpha = 1;
        } else {
            this.#buttons.next_btn.alpha = 0.5;
        }
    }

    getView() {
        return this;
    }
}