import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { SelectBoundaryEdgesStep } from "../steps/SelectBoundaryEdgesStep.js";
import { View } from "../../kioschool/basic/view/View.js";
import { AddEdgeToTreeStep } from "../steps/AddEdgeToTreeStep.js";

/**
 * Представление ребра для алгоритма Прима
 */
export class PrimEdgeView extends View {
    #edge;
    #tf;
    #w;
    #h;
    x1;
    x2;
    y1;
    y2;

    #mainShape;
    #glowFilter;

    constructor(view1, view2) {
        super();

        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        this.x = Math.min(view1.x, view2.x);
        this.y = Math.min(view1.y, view2.y);

        this.#w = Math.max(view1.x, view2.x) - Math.min(view1.x, view2.x);
        this.#h = Math.max(view1.y, view2.y) - Math.min(view1.y, view2.y);

        if ((this.x === view1.x && this.y === view1.y) ||
            (this.x === view2.x && this.y === view2.y)) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = this.#w;
            this.y2 = this.#h;
        } else {
            this.x1 = 0;
            this.y1 = this.#h;
            this.x2 = this.#w;
            this.y2 = 0;
        }

        this.#mainShape.graphics.setStrokeStyle(3);
        this.#mainShape.graphics.beginStroke("#222222");
        this.#mainShape.graphics.moveTo(this.x1, this.y1);
        this.#mainShape.graphics.lineTo(this.x2, this.y2);

        this.#tf = new createjs.Text("", "bold 14px Arial", "#000000");

        let self = this;
        this.addEventListener("rollover", function() {
            self.#over(self);
        });
        this.addEventListener("rollout", function () {
            self.#out(self);

        });
        this.addEventListener("pressup", function () {
            self.#up(self);
        });
    }

    #up(self) {
        this.removeChild(this.#glowFilter);

        if(ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectBoundaryEdgesStep &&
            !self.#edge.inTreeGetter()) {
            self.#edge.selectedSetter(!self.#edge.selectedGetter());
        } else if(ManipulatorManager.instanceGetter().currentStepGetter() instanceof AddEdgeToTreeStep &&
            !self.#edge.inTreeGetter()) {
            ManipulatorManager.instanceGetter().currentStepGetter().changeUser(self.#edge);
        } else if(ManipulatorManager.instanceGetter().currentStepGetter() instanceof AddEdgeToTreeStep) {
            if (ManipulatorManager.instanceGetter().currentStepGetter().edge() === self.#edge) {
                ManipulatorManager.instanceGetter().currentStepGetter().changeUser(null);
            }
        }
    }

    #over(self) {
        if (self.#edge.inTreeGetter()) {
            return;
        }

        this.#glowFilter = new createjs.Shape();
        this.#glowFilter.graphics.setStrokeStyle(10);
        this.#glowFilter.graphics.beginStroke("rgba(255, 64, 146, 0.5)");
        this.#glowFilter.graphics.moveTo(this.x1, this.y1);
        this.#glowFilter.graphics.lineTo(this.x2, this.y2);
        this.addChildAt(this.#glowFilter, 0);
    }

    #out(self){
        if (self.#edge.inTreeGetter()) {
            return;
        }

        this.removeChild(this.#glowFilter);
    }

    edgeGetter() {
        return this.#edge;
    }

    edgeSetter(value) {
        this.#edge = value;
    }

    /**
     * Располагает текст в центре
     * @param	tf
     */
    placeTextInTheMiddle() {
        this.#tf.x = Math.abs((this.x2 - this.x1)/2) - 10 + this.x;
        this.#tf.y = Math.abs((this.y2 - this.y1)/2) - 5 + this.y;
        this.parent.addChild(this.#tf);
    }

    update() {
        this.#mainShape.graphics.setStrokeStyle(3);
        this.#mainShape.graphics.beginStroke("#555555");

        if (this.edgeGetter().selectedGetter()) {
            this.#mainShape.graphics.setStrokeStyle(3);
            this.#mainShape.graphics.beginStroke("#ff0000");
        }

        if (this.edgeGetter().inTreeGetter()) {
            this.#mainShape.graphics.setStrokeStyle(3);
            this.#mainShape.graphics.beginStroke("#5555ff");
        }

        if (this.edgeGetter().selectedGetter()) {
            this.#tf.visible = true;
        } else {
            this.#tf.visible = false;
        }

        this.#mainShape.graphics.moveTo(this.x1, this.y1);
        this.#mainShape.graphics.lineTo(this.x2, this.y2);

        this.#tf.text = this.edgeGetter().weightGetter() + "";
    }
}