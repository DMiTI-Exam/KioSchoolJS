import { TextField } from "../../additionalComponents/TextField.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { ColorUtil } from "../../kioschool/util/ColorUtil.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";

export class ItemView extends createjs.Container {
    #item;
    #tfSymbols = new TextField(this, "itemView");
    #itemShape;

    constructor(item) {
        super();

        let xOffset = 6;
        let yOffset = 6;
        let whOffset = 4;

        this.#item = item;
        this.#itemShape = new createjs.Shape();
        this.addChild(this.#itemShape);
        this.#tfSymbols.setX(15 - xOffset);
        this.#tfSymbols.setY(55 - yOffset);
        this.#tfSymbols.setWidth(15 + whOffset);
        this.#tfSymbols.setHeight(15 + whOffset);
        this.#tfSymbols.hideOnOverflowY(true);
        this.#tfSymbols.setSelectable(false);
        this.#tfSymbols.setType("dynamic");

        let textFormat = new TextFormat("Arial", 13, "#000000", null, null,
            null, null, 4, 18);
        this.#tfSymbols.setTextFormat(textFormat);

        let self = this;
        this.#tfSymbols.addEventListener("mousedown", function () {
            self.up(self);
        });
    }

    up(self) {
        if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO &&
            !self.#item.fixedGetter()) {
            ManipulatorManager.instanceGetter().currentStepGetter().updateSelectedItem(self.#item);
            self.update();
        }
    }

    update() {
        this.#itemShape.graphics.clear();
        this.#tfSymbols.setText(this.#item.symbolGetter());
        this.#itemShape.graphics.setStrokeStyle(3);
        this.#itemShape.graphics.beginStroke(ColorUtil.BLUE);
        this.#itemShape.graphics.beginFill("#FFFFFF");
        this.#itemShape.graphics.drawRect(0, 0, 20, 20);
        this.#itemShape.graphics.endFill();

        this.#itemShape.graphics.setStrokeStyle(3);
        this.#itemShape.graphics.beginStroke(ColorUtil.ORANGE);
        this.#itemShape.graphics.moveTo(0, 0);
        if (this.#item.deletedGetter()) {
            this.#itemShape.graphics.lineTo(20, 20);
            this.#itemShape.graphics.moveTo(20, 0);
            this.#itemShape.graphics.lineTo(0, 20);
        }
    }
}