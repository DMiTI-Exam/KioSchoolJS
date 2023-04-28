import { View } from '../../kioschool/basic/view/View.js'
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { FormGraphStep } from "../steps/FormGraphStep.js";
import { SelectRhombStep } from "../steps/SelectRhombStep.js";
import { FinalStep } from "../steps/FinalStep.js";

/**
 * Представление графа для алгоритма максимального парасочетания
 *
 */
export class MatchingGraphChainView extends View {
    #graph;
    #mainShape;

    constructor(graph) {
        super();

        this.#graph = graph;
        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);
    }

    update() {
        this.#mainShape.graphics.clear();

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FormGraphStep) {
            this.#mainShape.graphics.setStrokeStyle(1);
            this.#mainShape.graphics.beginStroke("rgba(119, 119, 119, 1)");
            this.#mainShape.graphics.moveTo(170, 0);
            this.#mainShape.graphics.lineTo(170, 350);

            this.#mainShape.graphics.drawRect(10, 0, 330, 350);
        }

        this.#drawEdges();

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectRhombStep ||
            ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
            for (let i = 0; i < this.#graph.sourcesGetter().length; i++) {
                if (this.#graph.sourcesGetter()[i].sourceTargetSelectedGetter()) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                } else if (this.#graph.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                    if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                        continue;
                    } else {
                        this.#mainShape.graphics.setStrokeStyle(1);
                        this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                    }
                } else {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(119, 119, 119, 1)");
                }

                this.#mainShape.graphics.moveTo(10, 170);
                this.#mainShape.graphics.lineTo(this.#graph.sourcesGetter()[i].chainXGetter(),
                    this.#graph.sourcesGetter()[i].chainYGetter());
                this.#mainShape.graphics.setStrokeStyle(1);
                this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
                this.#drawArrow(10, 170, this.#graph.sourcesGetter()[i].chainXGetter(),
                    this.#graph.sourcesGetter()[i].chainYGetter(),
                    !this.#graph.sourcesGetter()[i].sourceTargetSelectedGetter() &&
                    !this.#graph.sourcesGetter()[i].lastSourceTargetSelectedGetter());
            }

            for (let i = 0; i < this.#graph.targetsGetter().length; i++) {
                if (this.#graph.targetsGetter()[i].sourceTargetSelectedGetter()) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                } else if (this.#graph.targetsGetter()[i].lastSourceTargetSelectedGetter()) {
                    if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
                        continue;
                    } else {
                        this.#mainShape.graphics.setStrokeStyle(1);
                        this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                    }
                } else {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(119, 119, 119, 1)");
                }

                this.#mainShape.graphics.moveTo(320, 170);
                this.#mainShape.graphics.lineTo(this.#graph.targetsGetter()[i].chainXGetter(),
                    this.#graph.targetsGetter()[i].chainYGetter());
                this.#mainShape.graphics.setStrokeStyle(1);
                this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
                this.#drawArrow(this.#graph.targetsGetter()[i].chainXGetter(),
                    this.#graph.targetsGetter()[i].chainYGetter(), 320, 170,
                    !this.#graph.targetsGetter()[i].sourceTargetSelectedGetter() &&
                    !this.#graph.targetsGetter()[i].lastSourceTargetSelectedGetter());
            }
        }

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].updateViews();
        }
    }
    
    #drawEdges() {
        this.#mainShape.graphics.setStrokeStyle(1);
        this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
        let cnt = 0;
        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].approvedGetter()) {
                if (this.#graph.edgesGetter()[i].lastSelectedGetter() &&
                    ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_DEMO &&
                    ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep &&
                    this.#graph.edgesGetter()[i].switchedGetter()) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(0, 255, 0, 1)");
                } else if (this.#graph.edgesGetter()[i].selectedGetter()) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                } else if (this.#graph.edgesGetter()[i].lastSelectedGetter() &&
                    ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_DEMO) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                } else if (this.#graph.edgesGetter()[i].switchedGetter()) {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(0, 255, 0, 1)");
                } else if (this.#graph.edgesGetter()[i].lastSelectedGetter()) {
                    if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_DEMO) {
                        this.#mainShape.graphics.setStrokeStyle(1);
                        this.#mainShape.graphics.beginStroke("rgba(235, 90, 140, 1)");
                    } else {
                        this.#mainShape.graphics.setStrokeStyle(1);
                        this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
                    }
                } else {
                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
                }

                this.#mainShape.graphics.moveTo((this.#graph.edgesGetter()[i].sourceGetter()).chainXGetter(),
                    (this.#graph.edgesGetter()[i].sourceGetter()).chainYGetter());
                this.#mainShape.graphics.lineTo((this.#graph.edgesGetter()[i].targetGetter()).chainXGetter(),
                    (this.#graph.edgesGetter()[i].targetGetter()).chainYGetter());

                if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof SelectRhombStep ||
                    ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
                    let x1 = this.#graph.edgesGetter()[i].sourceGetter().chainXGetter();
                    let y1 = this.#graph.edgesGetter()[i].sourceGetter().chainYGetter();
                    let x2 = this.#graph.edgesGetter()[i].targetGetter().chainXGetter();
                    let y2 = this.#graph.edgesGetter()[i].targetGetter().chainYGetter();

                    if (x1 > x2) {
                        let xt = x2;
                        x2 = x1;
                        x1 = xt;
                        let yt = y2;
                        y2 = y1;
                        y1 = yt;
                    }

                    this.#mainShape.graphics.setStrokeStyle(1);
                    this.#mainShape.graphics.beginStroke("rgba(0, 0, 0, 1)");
                    if (this.#graph.edgesGetter()[i].sourceGetter().firstPartGetter() !==
                        this.#graph.edgesGetter()[i].targetGetter().firstPartGetter()) {
                        if (cnt % 4 === 0) {
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 0);
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 10);
                        } else if (cnt % 4 === 1) {
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 2);
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 12);
                        } else if (cnt % 4 === 2) {
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 4);
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 14);
                        } else if (cnt % 4 === 3) {
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 5);
                            this.#drawArrow(x1, y1, x2, y2, !this.#graph.edgesGetter()[i].switchedGetter(), 16);
                        }

                        cnt++;
                    }
                }
            }
        }
    }

    #drawArrow(x1, y1, x2, y2, direct = true, count = 8) {
        let shift = count % 17 - 8;

        let phi = Math.atan((y1 - y2) / (x2 - x1));
        let koef = 2 / ((x2 - x1) / Math.cos(phi));

        x1 = this.#shiftPointX(x1, direct, shift, phi);
        x2 = this.#shiftPointX(x2, direct, shift, phi);
        y1 = this.#shiftPointY(y1, direct, shift, phi);
        y2 = this.#shiftPointY(y2, direct, shift, phi);

        let xc1 = (x1 + x2) / 2 + (y1 - y2)*koef;
        let yc1 = (y1 + y2) / 2 - (x1 - x2)*koef;

        let xc2 = (x1 + x2) / 2 - (y1 - y2)*koef;
        let yc2 = (y1 + y2) / 2 + (x1 - x2)*koef;

        let xc = this.#shiftPointXDir((x1+x2)/2, direct, 1, phi);
        let yc = this.#shiftPointYDir((y1+y2)/2, direct, 1, phi);

        this.#mainShape.graphics.moveTo(xc1, yc1);
        this.#mainShape.graphics.lineTo(xc, yc);
        this.#mainShape.graphics.lineTo(xc2, yc2);
    }

    #shiftPointX(xc1, direct, shift, phi) {
        return  (xc1) + shift * 10 * Math.cos(phi);// : (xc1) - shift * 10 * Math.cos(phi);
    }

    #shiftPointY(yc1, direct, shift, phi) {
        return (yc1) - shift * 10 * Math.sin(phi);// : (yc1) + shift * 10 * Math.sin(phi);
    }

    #shiftPointXDir(xc1, direct, shift, phi) {
        return direct? (xc1) + shift * 10 * Math.cos(phi) : (xc1) - shift * 10 * Math.cos(phi);
    }

    #shiftPointYDir(yc1, direct, shift, phi) {
        return direct?(yc1) - shift * 10 * Math.sin(phi) : (yc1) + shift * 10 * Math.sin(phi);
    }
}