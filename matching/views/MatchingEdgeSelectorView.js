import { View } from '../../kioschool/basic/view/View.js'
import { ManipulatorManager } from '../../kioschool/controller/ManipulatorManager.js'
import { FormGraphStep } from "../steps/FormGraphStep.js";
import { MatchingController } from "../controller/MatchingController.js";

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class MatchingEdgeSelectorView extends View {
    #edge;
    #overed = false;
    #mainShape;

    constructor(edge) {
        super();

        this.#edge = edge;
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        let self = this;
        this.addEventListener("mouseover", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                return;
            }

            self.#overed = true;
            self.update();
        });

        this.addEventListener("mouseout", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                return;
            }

            self.#overed = false;
            self.update();
        });

        this.addEventListener("mousedown", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                return;
            }

            if(self.#overed){
                self.edgeGetter().selectedSetter(!self.edgeGetter().selectedGetter());
                self.edgeGetter().switchedSetter(!self.edgeGetter().switchedGetter());
                MatchingController.instanceGetter().graphGetter().viewGetter().update();
                self.parent.update();
           }
        });
    }

    update() {
        this.#mainShape.graphics.clear();

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
            return;
        }

        this.#mainShape.graphics.setStrokeStyle(5);
        this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 0.01)");
        
        if (this.edgeGetter().selectedGetter()) {
            this.#mainShape.graphics.setStrokeStyle(1);
            this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 1)");
        }

        if (this.#overed){
            this.#mainShape.graphics.setStrokeStyle(5);
            this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 0.3)");
        }

        this.#mainShape.graphics.moveTo(0, 0);
        this.#mainShape.graphics.lineTo(this.edgeGetter().targetGetter().chainXGetter() -
            this.edgeGetter().sourceGetter().chainXGetter(),
            this.edgeGetter().targetGetter().chainYGetter() -
            this.edgeGetter().sourceGetter().chainYGetter());

        this.#mainShape.graphics.endFill();
    }

    edgeGetter() {
        return this.#edge;
    }

    edgeSetter(value) {
        this.#edge = value;
    }
}