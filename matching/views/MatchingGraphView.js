import { View } from '../../kioschool/basic/view/View.js'
import { GraphConstructor } from '../utils/GraphConstructor.js'
import { MathUtil } from "../../kioschool/util/MathUtil.js";

/**
 * Представление графа для алгоритма максимального парасочетания
 */
export class MatchingGraphView extends View {
    static #KOEF = 2.3;

    static #KOEF2 = 2;

    static #KOEF3 = 2.7;

    #graph;
    #mainShape;

    constructor (graph) {
        super();

        this.#graph = graph;
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape)
    }

    update() {
        this.#mainShape.graphics.clear();
        this.#drawHexagon();
        this.#drawEdges();
        this.#drawWalls();
        this.#drawSelection();
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].updateViews();
        }
    }

    #drawWalls() {
        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].deletedGetter()) {
                this.#mainShape.graphics.setStrokeStyle(2);
                this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
            } else {
                this.#mainShape.graphics.setStrokeStyle(1);
                this.#mainShape.graphics.beginStroke("rgba(187, 187, 187, 1)");
            }

            let x1 = this.#graph.edgesGetter()[i].sourceGetter().xGetter();
            let y1 = this.#graph.edgesGetter()[i].sourceGetter().yGetter();
            let x2 = this.#graph.edgesGetter()[i].targetGetter().xGetter();
            let y2 = this.#graph.edgesGetter()[i].targetGetter().yGetter();
            let xc1 = (x1 + x2) / 2 + (y1 - y2) * Math.sqrt(3) / MatchingGraphView.#KOEF;
            let yc1 = (y1 + y2) / 2 - (x1 - x2) * Math.sqrt(3) / MatchingGraphView.#KOEF;

            let xc2 = (x1 + x2) / 2 - (y1 - y2) * Math.sqrt(3) / MatchingGraphView.#KOEF;
            let yc2 = (y1 + y2) / 2 + (x1 - x2) * Math.sqrt(3) / MatchingGraphView.#KOEF;

            this.#mainShape.graphics.moveTo(xc1, yc1);
            this.#mainShape.graphics.lineTo(xc2, yc2);
        }
    }

    #drawSelection() {
        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (!this.#graph.edgesGetter()[i].deletedGetter() && this.#graph.edgesGetter()[i].switchedGetter()) {
                this.#mainShape.graphics.setStrokeStyle(1);
                this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 0)");
                let x1 = (this.#graph.edgesGetter()[i].sourceGetter()).xGetter();
                let y1 = (this.#graph.edgesGetter()[i].sourceGetter()).yGetter();
                let x2 = (this.#graph.edgesGetter()[i].targetGetter()).xGetter();
                let y2 = (this.#graph.edgesGetter()[i].targetGetter()).yGetter();

                let xc1 = (x1 + x2) / 2 + (y1 - y2) * Math.sqrt(3) / MatchingGraphView.#KOEF3;
                let yc1 = (y1 + y2) / 2 - (x1 - x2) * Math.sqrt(3) / MatchingGraphView.#KOEF3;
                let xc2 = (x1 + x2) / 2 - (y1 - y2) * Math.sqrt(3) / MatchingGraphView.#KOEF3;
                let yc2 = (y1 + y2) / 2 + (x1 - x2) * Math.sqrt(3) / MatchingGraphView.#KOEF3;


                let xn1 = (xc1 + xc2) / 2 + (yc1 - yc2) * Math.sqrt(3)/ MatchingGraphView.#KOEF2;
                let yn1 = (yc1 + yc2) / 2 - (xc1 - xc2) * Math.sqrt(3)/ MatchingGraphView.#KOEF2;
                let xn2 = (xc1 + xc2) / 2 - (yc1 - yc2) * Math.sqrt(3)/ MatchingGraphView.#KOEF2;
                let yn2 = (yc1 + yc2) / 2 + (xc1 - xc2) * Math.sqrt(3)/ MatchingGraphView.#KOEF2;

                this.#mainShape.graphics.beginFill("rgba(136, 204, 46, 0.5)");
                this.#mainShape.graphics.moveTo(xc1, yc1);
                this.#mainShape.graphics.lineTo(xn1, yn1);
                this.#mainShape.graphics.lineTo(xc2, yc2);
                this.#mainShape.graphics.lineTo(xn2, yn2);
                this.#mainShape.graphics.endFill();
            }
        }
    }

    #drawEdges() {
        this.#mainShape.graphics.setStrokeStyle(1);
        this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].approvedGetter()) {
                this.#mainShape.graphics.moveTo((this.#graph.edgesGetter()[i].sourceGetter()).xGetter(),
                    (this.#graph.edgesGetter()[i].sourceGetter()).yGetter());
                this.#mainShape.graphics.lineTo((this.#graph.edgesGetter()[i].targetGetter()).xGetter(),
                    (this.#graph.edgesGetter()[i].targetGetter()).yGetter());
            }
        }
    }

    #drawHexagon() {
        this.#mainShape.graphics.setStrokeStyle(1);
        this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
        let lx = 0;
        let ly = -2 * GraphConstructor.SIDE_LENGTH;
        this.#mainShape.graphics.moveTo(GraphConstructor.INIT_X, GraphConstructor.INIT_Y + ly);
        for (let i = 0; i < 6; i++) {
            let alpha = (i + 1) * 60;
            let beta = MathUtil.toRadians(alpha);
            let nx = GraphConstructor.INIT_X + lx * Math.cos(beta) - ly * Math.sin(beta);
            let ny = GraphConstructor.INIT_Y + lx * Math.sin(beta) + ly * Math.cos(beta);
            this.#mainShape.graphics.lineTo(nx, ny);
        }
    }
}