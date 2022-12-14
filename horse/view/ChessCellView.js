import { View } from "../../kioschool/basic/view/View.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CalculateWeightStep } from "../steps/CalculateWeightStep.js";
import { SelectNextCellsStep } from "../steps/SelectNextCellsStep.js";
import { ChoseNextCellStep } from "../steps/ChoseNextCellStep.js";
import { HorseController } from "../controller/HorseController.js";
import { BoardHorse } from "../gui/BoardHorse.js";

/**
 * Представление клетки шахматной доски
 */
export class ChessCellView extends View {
    #cell;
    #width;
    #height;
    #tf;
    #select;
    #overs;
    #tovers;
    #traverse;
    #horse;
    #overed = false;
    #tovered = false;

    /**
     * Shape for update method
     */
    #mainShape;

    constructor(width, height) {
        super();

        let self = this;
        let self2 = this;

        this.#width = width;
        this.#height = height;

        this.#tf = new TextField(this, "horse");
        this.#tf.setBorderColor("#F8975B");
        this.#tf.setMaxChars(2);
        this.#tf.setPattern("0-9");
        this.#tf.setX(width - 35);
        this.#tf.setY(height + 15);
        this.#tf.setWidth(40);
        this.#tf.setHeight(30);
        let textFormat = new TextFormat("Verdana", 24, "#F8975B", true,
            null, null, "left");
        this.#tf.setTextFormat(textFormat);

        this.addEventListener("rollover", function (e) {
            self.#over(self);
        });
        this.addEventListener("rollout", function (e) {
            self.#out(self);
        });
        this.addEventListener("pressup", function (e) {
            self.#up(self2);
        });

        this.#select = new createjs.Shape();
        this.#traverse = new createjs.Shape();
        this.#overs = new createjs.Shape();
        this.#tovers = new createjs.Shape();
        this.#mainShape = new createjs.Shape();
        this.#horse = new BoardHorse();
        this.#horse.scaleX = 0.4;
        this.#horse.scaleY = 0.4;
        this.#horse.x = 15;
        this.#horse.y = 5;

        this.#overs.graphics.beginFill("#F8975B");
        this.#overs.graphics.drawRect(0, 0, this.#width, this.#height);
        this.#overs.graphics.endFill();
        this.#overs.alpha = 0.5;

        this.#traverse.graphics.beginFill("#8EC6EC");
        this.#traverse.graphics.drawRect(0, 0, this.#width, this.#height);
        this.#traverse.graphics.endFill();
        this.#traverse.alpha = 0.5;

        this.#tovers.graphics.beginFill("#8EC6EC");
        this.#tovers.graphics.drawRect(0, 0, this.#width, this.#height);
        this.#tovers.graphics.endFill();
        this.#tovers.alpha = 0.3;

        this.addChild(this.#mainShape);
        this.addChild(this.#select);
        this.addChild(this.#overs);
        this.addChild(this.#tovers);
        this.addChild(this.#traverse);
        this.addChild(this.#horse);

        this.#tf.addEventListener("input", function (e) {
            self.#updatetext(self);
        });
        this.#tf.addEventListener("click", function (e) {
            e.target.select();
        });
    }

    #updatetext(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalculateWeightStep) {
            ManipulatorManager.instanceGetter().currentStepGetter().inputUserWeight(self.#cell, self.#tf.getText());
        }
    }

    #up(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectNextCellsStep &&
            !self.#cell.traversedGetter()) {
            self.#cell.selectedSetter(!self.#cell.selectedGetter());
        }

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof ChoseNextCellStep &&
            self.#cell.selectedGetter()) {
            ManipulatorManager.instanceGetter().currentStepGetter().setInput(self.#cell);
        }
    }

    #over(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectNextCellsStep &&
            !self.#cell.traversedGetter()) {
            self.#overed = true;
            self.update();
        }

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof ChoseNextCellStep &&
            self.#cell.selectedGetter() && !self.#cell.traversedGetter()) {
            self.#tovered = true;
            self.update();
        }
    }

    #out(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectNextCellsStep &&
            !self.#cell.traversedGetter()) {
            self.#overed = false;
            self.update();
        }

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof ChoseNextCellStep &&
            self.#cell.selectedGetter()) {
            self.#tovered = false;
            self.update();
        }
    }

    setInput(edit) {
        if (edit) {
            this.#tf.setType("input");
            this.#tf.setSelectable(true);
            this.#tf.setBorder(true);
        } else {
            this.#tf.setType("dynamic");
            this.#tf.setSelectable(false);
            this.#tf.setBorder(false);
        }
    }

    cellGetter() {
        return this.#cell;
    }

    cellSetter(value) {
        this.#cell = value;
    }

    update() {
        this.#mainShape.graphics.clear();

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_DEMO &&
            ManipulatorManager.instanceGetter().currentStepGetter() instanceof ChoseNextCellStep &&
            this.cellGetter().selectedGetter()) {
            this.setInput(false);
            this.#tf.setVisible(true);
        } else if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO &&
            ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalculateWeightStep &&
            this.cellGetter().selectedGetter()) {
            this.setInput(true);
            this.#tf.setVisible(true);
        } else if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO &&
            ManipulatorManager.instanceGetter().currentStepGetter() instanceof ChoseNextCellStep &&
            this.cellGetter().selectedGetter()) {
            this.setInput(false);
            this.#tf.setVisible(true);
        } else {
            this.#tf.setVisible(false);
        }

        this.#tf.setText(this.cellGetter().weightGetter());
        if (this.cellGetter().weightGetter() === -1) {
            this.#tf.setText("?");
        }

        let textFormat = new TextFormat("Verdana", 24, "#F8975B", true, null,
            null, "right");
        this.#tf.setTextFormat(textFormat);

        let color = "#F9F6E2";
        if (!this.cellGetter().isOdd()) {
            color = "#6E6D64";
        }

        this.#mainShape.graphics.beginFill(color);

        this.#select.graphics.beginFill("#F8975B");
        this.#select.graphics.drawRect(1, 1, this.#width-2, this.#height-2);
        this.#select.graphics.endFill();

        this.#select.graphics.beginFill(color);
        this.#select.graphics.drawRect(5, 5, this.#width-10, this.#height-10);
        this.#select.graphics.endFill();

        if (this.#overed) {
            this.#overs.visible = true;
        } else {
            this.#overs.visible = false;
        }

        if (this.#tovered) {
            this.#tovers.visible = true;
        } else {
            this.#tovers.visible = false;
        }

        this.#mainShape.graphics.drawRect(0, 0, this.#width, this.#height);
        this.#mainShape.graphics.endFill();

        this.#select.visible = false;
        this.#traverse.visible = false;
        this.#horse.visible = false;

        if (this.cellGetter().selectedGetter()) {
            this.#select.visible = true;
        }

        if (this.cellGetter().traversedGetter()) {
            if (this.cellGetter() === HorseController.instanceGetter().boardGetter().activeCellGetter()) {
                this.#horse.visible = true;
            } else {
                this.#traverse.visible = true;
            }
        }
    }
}