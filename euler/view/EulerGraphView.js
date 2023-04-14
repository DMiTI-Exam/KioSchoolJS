import { View } from "../../kioschool/basic/view/View.js";
import { Cycle } from "../model/Cycle.js";
import { EulerController } from "../controller/EulerController.js";
import { ImageHolder } from "../gui/ImageHolder.js";

/**
 * Представление графа для алгоритма максимального парасочетания
 */
export class EulerGraphView extends View {
    #graph;
    #mainShape;

    constructor(graph) {
        super();

        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        this.#graph = graph;
    }

    update() {
        this.#mainShape.graphics.clear();
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].updateViews();
        }

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            this.#graph.edgesGetter()[i].getView().update();
        }

        let cycles = EulerController.instanceGetter().cyclesGetter();
        for (let i = 0; i < cycles.length; i++) {
            let cycle = cycles[i];
            for (let j = 0; j < cycle.edgesGetter().length - 1; j++) {
                let edge = cycle.edgesGetter()[j];
                let edge1 = cycle.edgesGetter()[j+1];
                let vertex = EulerController.instanceGetter().graphGetter().getVertex(edge, edge1);

                if (vertex == null) {
                    return;
                }

                let shiftX = 0;
                let shiftY = 0;
                let ret = this.#getShifts(edge, vertex, shiftY, shiftX);
                let ret2 = this.#getShifts(edge1, vertex, shiftY, shiftX);

                let colors = EulerController.instanceGetter().getColors(edge);
                let color = Cycle.colors[0];
                for (let k = 0; k < colors.length; k++) {
                    let bitmap = new ImageHolder().getNStep();
                    if (colors[k] === Cycle.colors[0]) {
                        color = Cycle.colors[1];
                        bitmap = new ImageHolder().getNStep1();
                    }
                }

                vertex.viewsGetter()[0].drawFootprint(ret.shiftX, ret.shiftY, ret2.shiftX, ret2.shiftY, color);
            }
        }
    }

    #getShifts(edge, vertex, shiftY, shiftX) {
        let x1;
        let y1;
        let x2;
        let y2;
        if (edge.sourceGetter() === vertex) {
            x1 = vertex.xGetter();
            y1 = vertex.yGetter();
            x2 = edge.targetGetter().xGetter();
            y2 = edge.targetGetter().yGetter();
        } else {
            x1 = vertex.xGetter();
            y1 = vertex.yGetter();
            x2 = edge.sourceGetter().xGetter();
            y2 = edge.sourceGetter().yGetter();
        }

        let s = 13;
        let s1 = 18;

        if (x1 === x2 && y2 < y1) {
            shiftY = -s1;
        } else if (x1 === x2 && y2 > y1) {
            shiftY = s1;
        } else if (y1 === y2 && x2 > x1) {
            shiftX = s1;
        } else if (y1 === y2 && x1 > x2) {
            shiftX = -s1;
        } else if (y2 < y1 && x2 > x1) {
            shiftX = s;
            shiftY = -s;
        } else if (y2 < y1 && x2 < x1) {
            shiftX = -s;
            shiftY = -s;
        } else if (y2 > y1 && x2 > x1) {
            shiftX = s;
            shiftY = s;
        } else if (y2 > y1 && x2 < x1) {
            shiftX = -s;
            shiftY = s;
        }

        return {shiftY:shiftY, shiftX:shiftX};
    }
}