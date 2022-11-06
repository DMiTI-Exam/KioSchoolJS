import { DefaultRegimeButtons } from "../../../gui/DefaultRegimeButtons.js";
import { IRegimePanel } from "../../controls/IRegimePanel.js";
import { ManipulatorManager } from "../../../controller/ManipulatorManager.js";

/**
 * Панель управления режимами, предоставляемая платформой по умолчанию
 */
export class DefaultRegimePanel extends IRegimePanel {
    /**
     * Расстояние до бордера
     */
    static BORDER_SPACE = 2;

    static GRAY_LINE_COLOR = "#EBEBED";

    static GRAY_LINE_WIDTH = 36;

    static DARK_GREEN_LINE_COLOR = "#88CC2E";

    static DARK_GREEN_LINE_WIDTH = 1;

    static LIGHT_GREEN_LINE_COLOR = "#BBE089";

    static LIGHT_GREEN_LINE_WIDTH = 4;

    #buttons = new DefaultRegimeButtons();

    #helpCaption = new createjs.Text("", "bold 14px Verdana", "#6F6F6F");

    static fullHeightGetter() {
        return this.DARK_GREEN_LINE_WIDTH + this.LIGHT_GREEN_LINE_WIDTH +
            this.GRAY_LINE_WIDTH;
    }

    /**
     * Конструктор, инициализирует слушателей кнопок смены режимов
     */
    constructor(width, height) {
        super();

        let shape = new createjs.Shape();
        shape.graphics.setStrokeStyle(1);
        shape.graphics.beginStroke(DefaultRegimePanel.GRAY_LINE_COLOR);
        shape.graphics.beginFill(DefaultRegimePanel.GRAY_LINE_COLOR);
        shape.graphics.drawRect(0, 0, width-1, DefaultRegimePanel.GRAY_LINE_WIDTH-1);
        shape.graphics.endFill();
        shape.graphics.endStroke();
        shape.graphics.setStrokeStyle(1);
        shape.graphics.beginStroke(DefaultRegimePanel.DARK_GREEN_LINE_COLOR);
        shape.graphics.moveTo(0, DefaultRegimePanel.GRAY_LINE_WIDTH);
        shape.graphics.lineTo(width-1, DefaultRegimePanel.GRAY_LINE_WIDTH);
        shape.graphics.setStrokeStyle(1);
        shape.graphics.beginStroke(DefaultRegimePanel.LIGHT_GREEN_LINE_COLOR);
        shape.graphics.beginFill(DefaultRegimePanel.LIGHT_GREEN_LINE_COLOR);
        shape.graphics.drawRect(0, DefaultRegimePanel.GRAY_LINE_WIDTH+1, width-1,
            DefaultRegimePanel.LIGHT_GREEN_LINE_WIDTH-1);
        shape.graphics.endFill();
        shape.graphics.endStroke();
        this.addChild(shape);

        this.addChild(this.#buttons);
        this.#buttons.x = (width - this.#buttons.getBounds().width) / 2;

        this.#helpCaption.text = "Справка";
        this.#helpCaption.maxWidth = 80;
        this.addChild(this.#helpCaption);
        this.#helpCaption.x = (width - this.#helpCaption.maxWidth) / 2;
        this.#helpCaption.y = 7;

        this.#buttons.demoBtn.addEventListener("mousedown", function (event) {
            ManipulatorManager.instanceGetter().regimeSetter(ManipulatorManager.REGIME_DEMO);
        });

        this.#buttons.trainBtn.addEventListener("mousedown", function (event) {
            ManipulatorManager.instanceGetter().regimeSetter(ManipulatorManager.REGIME_TRAINING);
        });

        this.#buttons.controlBtn.addEventListener("mousedown", function (event) {
            ManipulatorManager.instanceGetter().regimeSetter(ManipulatorManager.REGIME_CONTROL);
        });

        if (ManipulatorManager.demo) {
            this.#buttons.demoButtonHelper.enabled = false;
            this.#buttons.trainButtonHelper.enabled = false;
            this.#buttons.trainBtn.visible = false;
            this.#buttons.controlButtonHelper.enabled = false;
            this.#buttons.controlBtn.visible = false;
        }

        this.hideHelp();
    }

    showHelp() {
        this.#helpCaption.visible = true;
        this.#buttons.visible = false;
    }

    hideHelp() {
        this.#buttons.visible = true;
        this.#helpCaption.visible = false;
    }

    regimeChanged(regime) {
        if (regime === ManipulatorManager.REGIME_DEMO) {
            this.#buttons.selectButton(this.#buttons.demoButtonHelper);
        } else if (regime === ManipulatorManager.REGIME_TRAINING) {
            this.#buttons.selectButton(this.#buttons.trainButtonHelper);
        } else if (regime === ManipulatorManager.REGIME_CONTROL) {
            this.#buttons.selectButton(this.#buttons.controlButtonHelper);
        }
    }

    getView() {
        return this;
    }
}