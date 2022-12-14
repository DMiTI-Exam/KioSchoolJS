import { TextField } from "../../additionalComponents/TextField.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { ColorUtil } from "../../kioschool/util/ColorUtil.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";
import { CalcWeightStep } from "../steps/CalcWeightStep.js";
import { CalcCodeStep } from "../steps/CalcCodeStep.js";
import { GlueStep } from "../steps/GlueStep.js";

export class NodeView extends createjs.Container {
    static nodeNames = [];

    static #currentNodeId = 0;

    #node;
    #tfSymbols;
    #tfWeight;
    #tfCode;
    #over = false;
    #nodeShape;
    #textFieldName;

    constructor(node) {
        super();

        this.#textFieldName = "nodeView_" + NodeView.#currentNodeId;
        NodeView.nodeNames.push(this.#textFieldName);
        this.#tfSymbols = new TextField(this, this.#textFieldName);
        this.#tfWeight = new TextField(this, this.#textFieldName);
        this.#tfCode = new TextField(this, this.#textFieldName);
        NodeView.#currentNodeId++;

        this.#node = node;

        this.#tfSymbols.setWidth(45);
        this.#tfWeight.setWidth(45);
        this.#tfCode.setWidth(45);

        this.#tfSymbols.setHeight(15);
        this.#tfWeight.setHeight(15);
        this.#tfCode.setHeight(15);

        let textFormat = new TextFormat("Arial", 13, "#000000", null, null,
            null, null, 3, 18);
        this.#tfWeight.setTextFormat(textFormat);
        this.#tfCode.setTextFormat(textFormat);

        this.#nodeShape = new createjs.Shape();
        this.addChild(this.#nodeShape);

        this.#tfSymbols.setX(15);
        this.#tfSymbols.setY(55);
        this.#tfSymbols.hideOnOverflowY(true);
        this.#tfWeight.setX(15);
        this.#tfWeight.setY(75);
        this.#tfWeight.hideOnOverflowY(true);
        this.#tfCode.setX(15);
        this.#tfCode.setY(95);
        this.#tfCode.hideOnOverflowY(true);

        this.#tfSymbols.setSelectable(false);
        this.#tfSymbols.setType("dynamic");

        let self = this;
        /*this.addEventListener("rollover", function () {
            self.over(self);
        });
        this.addEventListener("rollout", function () {
            self.out(self);
        });
        this.addEventListener("pressup", function () {
            self.up(self);
        });*/

        this.#tfSymbols.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.#tfSymbols.addEventListener("mouseout", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.#tfSymbols.addEventListener("mouseup", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.up(self);
            }
        });

        this.#tfWeight.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.#tfWeight.addEventListener("mouseout", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.#tfWeight.addEventListener("mouseup", function (e) {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.up(self);
            }

            e.target.select();
        });

        this.#tfCode.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.#tfCode.addEventListener("mouseout", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.#tfCode.addEventListener("mouseup", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.up(self);
            }
        });

        this.#tfWeight.addEventListener("input", function () {
            self.#updateweight(self);
        });
        this.#tfCode.addEventListener("input", function () {
            self.#updatecode(self);
        });
    }

    #updateweight(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalcWeightStep) {
            self.#node.probabilitySetter(parseInt(self.#tfWeight.getText(), 10));
        }
    }

    #updatecode(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalcCodeStep) {
            self.#node.codeSetter(self.#tfCode.getText());
            console.log(self.#node.codeGetter());
        }
    }

    enableCodeField() {
        this.disableFields();
        if (this.#node.codeGetter() === "" &&
            (this.#node.parentGetter() == null || this.#node.parentGetter().codeGetter() !== "")) {
            this.#tfCode.setBorder(true);
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                this.#tfCode.setSelectable(true);
                this.#tfCode.setType("input");
            }
        }
    }

    enableWeightField() {
        this.disableFields();
        if (this.#node === (ManipulatorManager.instanceGetter().previousStepGetter().parentNodeGetter())) {
            this.#tfWeight.setBorder(true);
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                this.#tfWeight.setSelectable(true);
                this.#tfWeight.setType("input");
            }
        }
    }

    disableFields() {
        this.#tfWeight.setSelectable(false);
        this.#tfCode.setSelectable(false);
        this.#tfWeight.setBorder(false);
        this.#tfCode.setBorder(false);
        this.#tfWeight.setType("dynamic");
        this.#tfCode.setType("dynamic");
    }

    over(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof GlueStep &&
            self.#node.parentGetter() == null) {
            self.#over = true;
            self.update();
        }
    }

    out(self) {
        self.#over = false;
        self.update();
    }

    up(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof GlueStep &&
            self.#over) {
            ManipulatorManager.instanceGetter().currentStepGetter().updateSelected(self.#node);
            self.update();
        }
    }

    update() {
        this.x = this.#node.xGetter();
        this.y = this.#node.yGetter();

        this.#nodeShape.graphics.clear();
        this.#nodeShape.graphics.setStrokeStyle(3);
        this.#nodeShape.graphics.beginStroke(ColorUtil.BLUE);
        if (this.#node.selectedGetter()) {
            this.#nodeShape.graphics.beginFill(ColorUtil.YELLOW);
        } else if (this.#over) {
            this.#nodeShape.graphics.beginFill(ColorUtil.ORANGE);
        } else {
            this.#nodeShape.graphics.beginFill("#FFFFFF");
        }

        this.#nodeShape.graphics.drawRect(0, 0, 50, 60);
        this.#nodeShape.graphics.endFill();

        this.#nodeShape.graphics.drawRect(0, 0, 50, 20);
        this.#nodeShape.graphics.drawRect(0, 0, 50, 40);

        this.#tfSymbols.setText(this.#node.symbolsGetter());
        this.#tfWeight.setText(this.#node.probabilityGetter() + "");
        this.#tfCode.setText(this.#node.codeGetter());

        let textFormat = new TextFormat("Arial", 13, "#000000", true, null,
            null, null, 3);
        this.#tfSymbols.setTextFormat(textFormat);
    }

    getTextFieldName() {
        return this.#textFieldName;
    }
}