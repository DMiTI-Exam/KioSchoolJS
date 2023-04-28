import { View } from '../../kioschool/basic/view/View.js';
import { MatchingController } from "../controller/MatchingController.js";

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class MatchingSourceTargetSelectorView extends View {
    #vertex;
    #overed = false;
    #clicked = false;
    #cx;
    #mainShape;

    constructor(vertex, cx) {
        super();

        this.#cx = cx;
        this.#vertex = vertex;
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        let self = this;
        this.addEventListener("mouseover", function() {
            self.#overed = true;
            self.update()
        });

        this.addEventListener("mouseout", function() {
            self.#overed = false;
            self.update();
        });

        this.addEventListener("mousedown", function() {
            if (self.#overed) {
                self.vertexGetter().sourceTargetSelectedSetter(!self.vertexGetter().sourceTargetSelectedGetter());
                MatchingController.instanceGetter().graphGetter().viewGetter().update();
                self.parent.update()
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
        this.#mainShape.graphics.clear();

        this.#mainShape.graphics.setStrokeStyle(5);
        this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 0.01)");

        if (this.vertexGetter().sourceTargetSelectedGetter()) {
            this.#mainShape.graphics.setStrokeStyle(1);
            this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 1)");
        }

        if (this.#overed) {
            this.#mainShape.graphics.setStrokeStyle(5);
            this.#mainShape.graphics.beginStroke("rgba(255, 0, 0, 0.3)");
        }

        this.#mainShape.graphics.moveTo(0,0);
        this.#mainShape.graphics.lineTo(this.vertexGetter().chainXGetter() - this.#cx,
            this.vertexGetter().chainYGetter()-170);

        this.#mainShape.graphics.endFill();
    }
}