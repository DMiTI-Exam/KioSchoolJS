import { View } from "../../kioschool/basic/view/View.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { DijkstraVertex } from "../model/DijkstraVertex.js";
import { AdjacentVertexCorrectionStep } from "../steps/AdjacentVertexCorrectionStep.js";
import { NextVertexSelectionStep } from "../steps/NextVertexSelectionStep.js";
import { AdjacentVertexSelectionStep } from "../steps/AdjacentVertexSelectionStep.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";

/**
 * Представление вершины для алгоритма Прима в таблице-протоколе
 */
export class DijkstraVertexTableView extends View {
    #vertex;

    /**
     * Поле с именем
     */
    tfName;

    /**
     * Поле с прошлой меткой
     */
    tfLast;

    /**
     * Поле с текущей меткой
     */
    tfCurrent;

    #mainShape;

    constructor() {
        super();

        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        this.tfName = new TextField(this, "dijkstra");
        this.tfLast = new TextField(this, "dijkstra");
        this.tfCurrent = new TextField(this, "dijkstra");

        let textFormat = new TextFormat("Arial", 12, "#000000", false, false, false,
            "center", null, 18);
        this.tfName.setX(34);
        this.tfName.setY(605);
        this.tfName.setWidth(33);
        this.tfName.setHeight(20);
        this.tfName.setType("dynamic");
        this.tfName.setSelectable(false);
        this.tfName.setTextFormat(textFormat);

        this.tfLast.setX(34);
        this.tfLast.setY(625);
        this.tfLast.setWidth(33);
        this.tfLast.setHeight(20);
        this.tfLast.setType("dynamic");
        this.tfLast.setSelectable(false);
        this.tfLast.setTextFormat(textFormat);

        this.tfCurrent.setX(34);
        this.tfCurrent.setY(645);
        this.tfCurrent.setWidth(33);
        this.tfCurrent.setHeight(20);
        this.tfCurrent.setTextFormat(textFormat);

        let self = this;
        this.tfName.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.tfName.addEventListener("mouseout" , function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.tfName.addEventListener("mouseup", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.#up(self);
            }
        });

        this.tfLast.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.tfLast.addEventListener("mouseout" , function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.tfLast.addEventListener("mouseup", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.#up(self);
            }
        });

        this.tfCurrent.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.over(self);
            }
        });
        this.tfCurrent.addEventListener("mouseout" , function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.out(self);
            }
        });
        this.tfCurrent.addEventListener("mouseup", function () {
            if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                self.#up(self);
            }
        });

        this.tfCurrentGetter().addEventListener("input", function () {
            self.#updatetext(self);
        });
    }

    #updatetext(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep) {
            ManipulatorManager.instanceGetter().currentStepGetter()
                .inputUserWeight(self.#vertex, self.tfCurrentGetter().getText());
        }
    }

    #up(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof NextVertexSelectionStep &&
            !self.#vertex.inTreeGetter()) {
            self.out(self);
            ManipulatorManager.instanceGetter().currentStepGetter().userSelect(self.#vertex);
        } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexSelectionStep &&
            !self.#vertex.inTreeGetter()) {
            self.out(self);
            ManipulatorManager.instanceGetter().currentStepGetter().userSelect(self.#vertex);
        }
    }

    over(self) {
        if (self.#vertex.inTreeGetter()) {
            return;
        }

        self.#vertex.overSetter(true);
    }

    out(self) {
        if (this.#vertex.inTreeGetter()) {
            return;
        }

        this.#vertex.overSetter(false);
    }

    tfLastGetter() {
        return this.tfLast;
    }

    tfCurrentGetter() {
        return this.tfCurrent;
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    update() {
        if (this.vertexGetter().weightGetter() === DijkstraVertex.INFINITY_COST) {
            this.tfLastGetter().setText(String.fromCharCode(8734));
        } else {
            this.tfLastGetter().setText("" + this.vertexGetter().weightGetter());
        }

        if (!(ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep)) {
            if (this.vertexGetter().weightGetter() === DijkstraVertex.INFINITY_COST) {
                this.tfCurrentGetter().setText(String.fromCharCode(8734));
            } else {
                this.tfCurrentGetter().setText("" + this.vertexGetter().weightGetter());
            }
        } else {
            let t = ManipulatorManager.instanceGetter().currentStepGetter().getUserWeight().get(this.#vertex.nameGetter());
            if (t != null) {
                this.tfCurrentGetter().setText(t);
            } else {
                if (this.vertexGetter().weightGetter() === DijkstraVertex.INFINITY_COST) {
                    this.tfCurrentGetter().setText(String.fromCharCode(8734));
                } else {
                    this.tfCurrentGetter().setText("" + this.vertexGetter().weightGetter());
                }
            }
        }

        this.tfName.setText(" " + this.vertexGetter().nameGetter() + " ");

        this.#mainShape.graphics.clear();
        this.#mainShape.graphics.setStrokeStyle(1);
        this.#mainShape.graphics.beginStroke("rgba(170, 170, 170, 1)");
        this.#mainShape.graphics.moveTo(0, 0);
        this.#mainShape.graphics.lineTo(0, 60);
        this.#mainShape.graphics.lineTo(33, 60);
        this.#mainShape.graphics.moveTo(0, 20);
        this.#mainShape.graphics.lineTo(33, 20);
        this.#mainShape.graphics.moveTo(0, 40);
        this.#mainShape.graphics.lineTo(33, 40);
        this.#mainShape.graphics.moveTo(0, 0);
        this.#mainShape.graphics.lineTo(33, 0);

        if (this.vertexGetter().inTreeGetter()) {
           this.#mainShape.graphics.setStrokeStyle(1);
           this.#mainShape.graphics.beginStroke("rgba(277, 119, 119, 0.8)");
           this.#mainShape.graphics.beginFill("rgba(277, 119, 119, 0.8)");
           this.#mainShape.graphics.drawEllipse(1, 1, 31, 18);
           this.#mainShape.graphics.endFill();
        } else if (this.vertexGetter().selectedGetter()) {
            this.#mainShape.graphics.setStrokeStyle(1);
            this.#mainShape.graphics.beginStroke("rgba(232, 99, 232, 0.4)");
            this.#mainShape.graphics.beginFill("rgba(232, 99, 232, 0.4)");
            this.#mainShape.graphics.drawEllipse(1, 1, 31, 18);
            this.#mainShape.graphics.endFill();
        }

        if (this.#vertex.overGetter()) {
            if ((ManipulatorManager.instanceGetter().currentStepGetter() instanceof NextVertexSelectionStep)) {
                this.tfName.setGlow(true, 0, 0, 6, "#FF0000", 6);
            } else if ((ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexSelectionStep)) {
                this.tfName.setGlow(true, 0, 0, 6, "#E863E8", 6);
            } else if ((ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep)) {
                this.tfCurrentGetter().setGlow(true, 0, 0, 6, "#E863E8", 6);
            }
        } else {
            this.tfName.setGlow(false);
            this.tfCurrentGetter().setGlow(false);
        }
    }

    setInput(edit) {
        if (edit) {
            this.tfCurrentGetter().setType("input");
            this.tfCurrentGetter().setSelectable(true);
        } else {
            this.tfCurrentGetter().setType("dynamic");
            this.tfCurrentGetter().setSelectable(false);
        }
    }
}