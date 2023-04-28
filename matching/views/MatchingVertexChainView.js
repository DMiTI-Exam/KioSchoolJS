import { ManipulatorManager } from '../../kioschool/controller/ManipulatorManager.js'
import { View } from '../../kioschool/basic/view/View.js';
import { FormGraphStep } from "../steps/FormGraphStep.js";

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class MatchingVertexChainView extends View {
    #vertex;
    #moved = false;
    #mainShape;

    constructor(vertex) {
        super();

        this.#vertex = vertex;
        this.x = vertex.chainXGetter();
        this.y = vertex.chainYGetter();
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        let self = this;
        let offset;
        this.addEventListener("mousedown", function(evt) {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                offset = {x: self.x - evt.stageX, y: self.y - evt.stageY};
                self.#moved = true;
            }
        });

        let bounds = {x:10, y:0, width:330, height: 350};
        this.addEventListener("pressmove", function(evt) {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                if (self.#moved) {

                    evt.currentTarget.x = Math.max(bounds.x, Math.min(bounds.x + bounds.width, evt.stageX + offset.x));
                    evt.currentTarget.y = Math.max(bounds.y, Math.min(bounds.y + bounds.height, evt.stageY + offset.y));

                    self.vertexGetter().chainXSetter(self.x);
                    self.vertexGetter().chainYSetter(self.y);
                    self.update();
                    self.parent.update();
                }
            }
        });

        this.addEventListener("mouseup", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                self.#moved = false;
                self.vertexGetter().chainXSetter(x);
                self.vertexGetter().chainYSetter(y);
                self.update();
                self.parent().update();
            }
        });
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    update() {
        this.x = this.vertexGetter().chainXGetter();
        this.y = this.vertexGetter().chainYGetter();

        this.#mainShape.graphics.clear();

        if (this.vertexGetter().partMarkedGetter()) {
            if (this.vertexGetter().firstPartGetter()) {
                this.#mainShape.graphics.beginFill("rgba(255, 85, 85, 0.8)");
            } else {
                this.#mainShape.graphics.beginFill("rgba(85, 85, 255, 0.8)");
            }

            this.#mainShape.graphics.drawCircle(0, 0, 3);
        } else if (this.vertexGetter().dotMarkedGetter()) {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
                this.#mainShape.graphics.beginFill("rgba(153, 153, 153, 0.8)");
                this.#mainShape.graphics.drawCircle(0, 0, 5);
            }

            this.#mainShape.graphics.beginFill("rgba(0, 0, 0, 0.8)");
            this.#mainShape.graphics.drawCircle(0, 0, 3);
        }

        this.#mainShape.graphics.endFill();
    }
}