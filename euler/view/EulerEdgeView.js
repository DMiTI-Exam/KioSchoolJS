import { View } from "../../kioschool/basic/view/View.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { Cycle } from "../model/Cycle.js";
import { FinalStep } from "../steps/FinalStep.js";
import { EulerController } from "../controller/EulerController.js";
import { ImageHolder } from "../gui/ImageHolder.js";

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class EulerEdgeView extends View {
    #edge;
    #overed = false;
    #clicked = false;

    /**
     * Shape for update method
     */
    #mainContainer;
    #mainShape;

    constructor(edge) {
        super();

        this.#mainContainer = new createjs.Container();
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);
        this.addChild(this.#mainContainer);

        this.#edge = edge;
        this.x = edge.sourceGetter().xGetter();
        this.y = edge.sourceGetter().yGetter();

        let self = this;
        this.addEventListener("mouseover", function () {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
                return;
            }

            self.#overed = true;
            self.update();
        });

        this.addEventListener("mouseout", function () {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
                return;
            }

            self.#overed = false;
            self.update();
        });

        this.addEventListener("mousedown", function () {
            if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
                return;
            }

            if (self.#overed) {
                EulerController.instanceGetter().graphGetter().clearEdgeSelection(edge);
                edge.selectedSetter(!edge.selectedGetter());
                EulerController.instanceGetter().graphGetter().viewGetter().update();
            }
        });
    }

    update() {
        this.#mainContainer.removeAllChildren();

        let x2 = this.edgeGetter().targetGetter().xGetter();
        let y2 = this.edgeGetter().targetGetter().yGetter();

        if (!this.edgeGetter().selectedGetter()) {
            this.#mainShape.graphics.setStrokeStyle(22);
            this.#mainShape.graphics.beginStroke("#9A6F44");
        } else {
            this.#mainShape.graphics.setStrokeStyle(22);
            this.#mainShape.graphics.beginStroke("#FF4444");
        }

        if (this.#overed) {
            this.#mainShape.graphics.setStrokeStyle(22);
            this.#mainShape.graphics.beginStroke("#FF8888");
        }

        this.#mainShape.graphics.moveTo(0, 0);
        this.#mainShape.graphics.lineTo(x2 - this.x, y2 - this.y);

        let colors = EulerController.instanceGetter().getColors(this.edgeGetter());
        for (let i = 0; i < colors.length; i++) {
            this.#mainShape.graphics.setStrokeStyle(20);
            this.#mainShape.graphics.beginStroke(colors[i]);

            let xv1 = this.edgeGetter().sourceGetter().viewsGetter()[0].x;
            let xv2 = this.edgeGetter().targetGetter().viewsGetter()[0].x;
            let yv1 = this.edgeGetter().sourceGetter().viewsGetter()[0].y;
            let yv2 = this.edgeGetter().targetGetter().viewsGetter()[0].y;

            let bitmap = new ImageHolder().getNStep();
            if (colors[i] === Cycle.colors[0]) {
                bitmap = new ImageHolder().getNStep1();
            }

            if (this.edgeGetter().inverseGetter()) {
                this.#drawTrace(xv2 - this.x, yv2 - this.y, xv1 - this.x, yv1 - this.y, bitmap);
            } else {
                this.#drawTrace(xv1 - this.x, yv1 - this.y, xv2 - this.x, yv2 - this.y, bitmap);
            }
        }
    }

    #drawTrace(x1, y1, x2, y2, bitmap) {
        let matrix = new createjs.Matrix2D();
        let diagonal = Math.sqrt(Math.pow(bitmap.getBounds().width/2, 2) +
            Math.pow(bitmap.getBounds().height/2, 2));

        if (x1 === x2 && y2 < y1) {
            matrix.translate(-10, 0);
        } else if (x1 === x2 && y2 > y1){
            matrix.rotate(180);
            matrix.translate(-10,0);
        } else if (y1 === y2 && x2 > x1){
            matrix.rotate(90);
            matrix.translate(-bitmap.getBounds().width/2,-10);
        } else if (y1 === y2 && x1 > x2){
            matrix.rotate(-90);
            matrix.translate(-bitmap.getBounds().width/2,-10);
        } else if (y2 < y1 && x2 > x1){
            matrix.rotate(45);
            matrix.translate(-11,-11);
        } else if (y2 < y1 && x2 < x1){
            matrix.rotate(-45);
            matrix.translate(4 - diagonal,-4 + diagonal);
        } else if (y2 > y1 && x2 > x1){
            matrix.rotate(135);
            matrix.translate(4 - diagonal,-4 + diagonal);
        } else if (y2 > y1 && x2 < x1){
            matrix.rotate(-135);
            matrix.translate(-11,-11);
        }

        matrix.decompose(bitmap);

        let end = Math.sqrt(Math.pow((x2 - x1)/bitmap.getBounds().width, 2) +
            Math.pow((y2 - y1)/bitmap.getBounds().height, 2));
        for (let i = 1; i <= Math.floor(end); i++) {
            let container = new createjs.Container();
            let copiedStepBitmap = _.cloneDeep(bitmap);
            copiedStepBitmap.mouseEnabled = false;
            container.addChild(copiedStepBitmap);

            let dx = (x2 - x1);
            let dy = (y2 - y1);

            container.x = x1 + (dx === 0 ? 0 : dx/Math.abs(dx) * bitmap.getBounds().width * i * 0.8);
            container.y = y1 + (dy === 0 ? 0 : dy/Math.abs(dy) * bitmap.getBounds().height * i * 0.8);
            this.#mainContainer.addChild(container);
        }
    }

    edgeGetter() {
        return this.#edge;
    }

    edgeSetter(value) {
        this.#edge = value;
    }
}
