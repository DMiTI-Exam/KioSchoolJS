import { IPointContainer } from "../additionalInterfaces/IPointContainer.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { AdjacentVertexCorrectionStep } from "../steps/AdjacentVertexCorrectionStep.js";
import { NextVertexSelectionStep } from "../steps/NextVertexSelectionStep.js";
import { AdjacentVertexSelectionStep } from "../steps/AdjacentVertexSelectionStep.js";
import { DijkstraVertex } from "../model/DijkstraVertex.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";

/**
 * Представление вершины для алгоритма Прима
 */
export class DijkstraVertexView extends IPointContainer {
    #vertex;

    /**
     * Мувик нормального фона
     */
    #normal;

    /**
     * Мувик выделенного фона - включена в дерево
     */
    #inTree;

    /**
     * Мувик для обозначения обработки при корректировке весов
     */
    #select;

    /**
     * Поле с именами
     */
    tfName;

    /**
     *
     * Поле с весом (стоимостью)
     */
    tf;

    constructor(mc, graphView) {
        super();

        this.#inTree = mc.getChildByName("VFill2_mc");
        this.#normal = mc.getChildByName("VFill1_mc");
        this.#select = mc.getChildByName("VFill3_mc");

        this.x = mc.x;
        this.y = mc.y;

        this.tf = new TextField(graphView, "dijkstra");
        this.tf.setX(this.x + 28);
        this.tf.setY(this.y + 82);
        this.tf.setWidth(30);
        this.tf.setHeight(20);

        this.tfName = new TextField(graphView, "dijkstra");
        this.tfName.setX(this.x + 11);
        this.tfName.setY(this.y + 82);
        this.tfName.setWidth(20);
        this.tfName.setHeight(20);
        this.tfName.setType("dynamic");
        this.tfName.setSelectable(false);

        this.addChild(this.#normal);
        this.addChild(this.#inTree);
        this.addChild(this.#select);
        this.addChild(mc.getChildByName("VContent_mc"));

        let self = this;
        this.addEventListener("rollover", function () {
            self.over(self);
        });

        this.addEventListener("rollout", function () {
            self.out(self);
        });

        this.addEventListener("pressup", function () {
            self.#up(self);
         });

        this.tfGetter().addEventListener("mouseover", function () {
            self.over(self);
        });

        this.tfGetter().addEventListener("mouseout", function () {
            self.out(self);
        });

        this.tfGetter().addEventListener("mouseup", function () {
            self.#up(self);
        });

        this.tfGetter().addEventListener("input", function () {
            self.#updatetext(self);
        });

        this.tfGetter().addEventListener("click", function (e) {
            e.target.select();
        });
    }

    #updatetext(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep) {
            ManipulatorManager.instanceGetter().currentStepGetter().inputUserWeight(this.#vertex, self.tfGetter().getText())
        }
    }

    #up(self) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof NextVertexSelectionStep &&
            !self.#vertex.inTreeGetter()) {
            self.out(self);
           ManipulatorManager.instanceGetter().currentStepGetter().userSelect(self.#vertex);
        } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexSelectionStep &&
            !self.#vertex.inTreeGetter()){
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
        if (self.#vertex.inTreeGetter()) {
            return;
        }

        self.#vertex.overSetter(false);
    }

    tfGetter() {
        return this.tf;
    }

    pxGetter() {
        return this.x;
    }

    pyGetter() {
        return this.y;
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    update() {
        if(!(ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep)){
            if (this.vertexGetter().weightGetter() === DijkstraVertex.INFINITY_COST) {
                this.tfGetter().setText(String.fromCharCode(8734));
            } else {
                this.tfGetter().setText("" + this.vertexGetter().weightGetter());
            }
        } else {
            let t = ManipulatorManager.instanceGetter().currentStepGetter().getUserWeight().get(this.#vertex.nameGetter());
            if (t != null) {
                this.tfGetter().setText(t);
            } else {
                if (this.vertexGetter().weightGetter() === DijkstraVertex.INFINITY_COST) {
                    this.tfGetter().setText(String.fromCharCode(8734));
                } else {
                    this.tfGetter().setText("" + this.vertexGetter().weightGetter());
                }
            }
        }

        this.tfName.setText(this.vertexGetter().nameGetter() + ":");

        if (this.vertexGetter().inTreeGetter()) {
            this.#inTree.visible = true;
        } else {
            this.#inTree.visible = false;
        }

        if (this.vertexGetter().selectedGetter()) {
            this.#select.visible = true;
        } else {
            this.#select.visible = false;
        }

        let textFormat = new TextFormat ("Arial", 14, "#000000", true, null,
            null, null, null, 18);
        this.tfGetter().setTextFormat(textFormat);
        this.tfName.setTextFormat(textFormat);

        if(this.vertexGetter().overGetter()) {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof NextVertexSelectionStep) {
                this.tfName.setGlow(true, 0, 0, 5, "#FF0000", 6);
            } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexSelectionStep) {
                this.tfName.setGlow(true, 0, 0, 5, "#E863E8", 6);
            } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep) {
                this.tf.setGlow(true, 0, 0, 5, "#E863E8", 6);
            }
        } else {
            this.tfName.setGlow(false);
            this.tf.setGlow(false);
        }
    }

    setInput(edit) {
        if (edit) {
            this.tfGetter().setType("input");
            this.tfGetter().setSelectable(true);
            this.tfGetter().setBorder(true);
        } else {
            this.tfGetter().setType("dynamic");
            this.tfGetter().setBorder(false);
            this.tfGetter().setSelectable(false);
        }
    }
}
