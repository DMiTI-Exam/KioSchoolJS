import { View } from "../../kioschool/basic/view/View.js";
import { EulerController } from "../controller/EulerController.js";
import { Island } from "../gui/Island.js";

/**
 * Представление вершины для алгоритма построения максимального парасочетания
 */
export class EulerVertexView extends View {
    #vertex;
    #overed = false;
    #clicked = false;
    #holst = new createjs.Shape();
    #island = new Island();

    constructor(vertex) {
        super();

        this.#vertex = vertex;
        this.x = vertex.xGetter();
        this.y = vertex.yGetter();

        this.#island.x = this.#island.x - 25;
        this.#island.y = this.#island.y - 23;

        this.addChild(this.#island);
        this.addChild(this.#holst);
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    killSprite() {
        this.removeChild(this.#island);
    }

    update() {
        this.#holst.graphics.clear();
        this.#holst.graphics.setStrokeStyle(1);
        this.#holst.graphics.beginStroke("#555555");
        if (this.vertexGetter() === EulerController.instanceGetter().currentVertexGetter()) {
            this.#holst.graphics.setStrokeStyle(3);
            this.#holst.graphics.beginStroke("#FF8888");
            this.#holst.graphics.drawCircle(0, 0, 30);
        }
    }

    drawFootprint(shiftX1, shiftY1, shiftX2, shiftY2, color) {
        this.#holst.graphics.setStrokeStyle(3);
        this.#holst.graphics.beginStroke(color);
        this.#holst.alpha = 0.8;

        this.#holst.graphics.moveTo(shiftX1, shiftY1);
        this.#holst.graphics.lineTo(shiftX2, shiftY2);
    }
}