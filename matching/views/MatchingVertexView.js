import { ManipulatorManager } from '../../kioschool/controller/ManipulatorManager.js'
import { DrawGraphStep } from '../steps/DrawGraphStep.js'
import { View } from '../../kioschool/basic/view/View.js'

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class MatchingVertexView extends View {
    #vertex;
    #overed = false;
    #clicked = false;
    #mainShape;

    constructor(vertex) {
        super();

        this.#vertex = vertex;
        this.x = vertex.xGetter();
        this.y = vertex.yGetter();
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        let sp = new createjs.Shape();
        this.addChild(sp);
        sp.graphics.beginFill("rgba(255, 255, 255, 0.01)");
        sp.graphics.drawCircle(0, 0, 15);
        sp.graphics.endFill();

        let self = this;
        sp.addEventListener("mouseover", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof DrawGraphStep) {
                if (ManipulatorManager.instanceGetter().currentStepGetter().allowSelect(self.vertexGetter())) {
                    if (!self.#clicked) {
                        self.#overed = true;
                        self.update();
                    }
                }
            }
        });

        sp.addEventListener("mouseout", function() {
            if(ManipulatorManager.instanceGetter().currentStepGetter() instanceof DrawGraphStep){
                self.#overed = false;
                self.update();
            }
        });

        sp.addEventListener("mousedown", function() {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof DrawGraphStep) {
                if(self.#overed) {
                    self.#clicked = true;
                    self.#overed = false;
                    ManipulatorManager.instanceGetter().currentStepGetter().click(self.vertexGetter());
                    self.update();
                } else if (self.#clicked) {
                    self.#clicked = false;
                    self.update();
                    ManipulatorManager.instanceGetter().currentStepGetter().click(null);
                }
            }
        });
    }

    init() {

    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    update() {
        this.#mainShape.graphics.clear();

        if (this.#vertex.partMarkedGetter()) {
            if (this.#vertex.firstPartGetter()) {
                this.#mainShape.graphics.beginFill("rgba(255, 85, 85, 0.8)");
            } else {
                this.#mainShape.graphics.beginFill("rgba(85, 85, 255, 0.8)");
            }

            this.#mainShape.graphics.drawCircle(0, 0, 3);
        } else if (this.#vertex.dotMarkedGetter()) {
            this.#mainShape.graphics.beginFill("rgba(0, 0, 0, 0.8)");
            this.#mainShape.graphics.drawCircle(0, 0, 3);
        }

        if (this.#overed || this.#clicked) {
            this.#mainShape.graphics.beginFill("rgba(255, 0, 0, 0.8)");
            this.#mainShape.graphics.drawCircle(0, 0, 3);
        }

        this.#mainShape.graphics.endFill();
    }

    reset() {
        this.#clicked = false;
        this.update();
    }
}