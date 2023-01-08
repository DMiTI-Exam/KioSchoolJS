import { Utils } from "../utils/Utils.js";
import { Edge } from "../model/Edge.js";
import { VertexView } from "./VertexView.js";
import { Globals } from "../utils/Global.js";
import { KruskalController } from "../controller/KruskalController.js";

export class EdgeView extends createjs.Container {
    static RIGHT_EDGE_MOVED = "rigth edge moved";

    #edge;
    #txt = null;
    #txt2 = null;
    #showRightEdge = false;
    #movableRightEdge = false;
    #rightV1view;
    #rightV2view;
    #rightDeltaY = 0;
    #s;
    #capturePoint = null; //null means edge is not captured
    #mainShape;

    //private var _showRighEdgeSelectionBox:Boolean = false;

    constructor(edge) {
        super();

        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        this.#edge = edge;
        let self = this;
        edge.addEventListener(Edge.EDGE_MODIFIED, function () {
            self.repaint();
        });

        this.addEventListener("rollover", function() {
            edge.highLightedSetter(Edge.HL_TRUE);
        });

        this.addEventListener("rollout", function() {
            edge.highLightedSetter(Edge.HL_FALSE);
        });

        this.#rightV1view = new VertexView(edge.v1, new createjs.Point(this.getRightEdgeX(), this.getRightEdgeY()));
        this.#rightV2view = new VertexView(edge.v2, new createjs.Point(this.getRightEdgeX2(), this.getRightEdgeY()));

        //DEBUG
        //movableRightEdge = true;
        this.showRightEdgeSetter(true);

        this.repaint();
    }

    repaint() {
        if (this.#txt) {
            this.removeChild(this.#txt);
        }

        this.#mainShape.graphics.clear();

        this.#rightV1view.posYSetter(this.getRightEdgeY() + this.#rightDeltaY);
        this.#rightV2view.posYSetter(this.getRightEdgeY() + this.#rightDeltaY);

        if (this.#edge.displayGetter() === Edge.DISP_FALSE) {
            return;
        }

        let color;
        let lineWidth = Globals.LINE_WIDTH_ACTIVE;
        switch (this.#edge.selectedGetter()) {
            case Edge.SEL_FALSE:
                color = Globals.COLOR_SEL_FALSE;
                lineWidth = Globals.LINE_WIDTH_NOTACTIVE;
                break;
            case Edge.SEL_TRUE:
                lineWidth = Globals.LINE_WIDTH_ACTIVE;
                color = Utils.getColorByInd(this.#edge.v2.colorGetter());
                break;
            case Edge.SEL_UNKNOWN:
                lineWidth = Globals.LINE_WIDTH_ACTIVE;
                color = Globals.COLOR_SEL_UNKNOWN;
                break;
        }
        if (this.#edge.lastGetter() === Edge.LAST_TRUE) {
            lineWidth = Globals.LINE_WIDTH_LAST;
            color = Globals.COLOR_LAST_TRUE;
        }

        this.#mainShape.graphics.setStrokeStyle(lineWidth);
        this.#mainShape.graphics.beginStroke(color);

        //draw segment
        this.#mainShape.graphics.moveTo(this.#edge.v1.xGetter(), this.#edge.v1.yGetter());
        this.#mainShape.graphics.lineTo(this.#edge.v2.xGetter(), this.#edge.v2.yGetter());

        let ry;
        if (this.#showRightEdge) {
            ry = this.getRightEdgeY() + this.#rightDeltaY;

            //TODO make podlozhka
            /*this.#mainShape.graphics.setStrokeStyle(Math.min(2 * Globals.POINT_RADIUS, Globals.getRigthEdgesGap()));
            this.#mainShape.graphics.beginStroke(Globals.COLOR_SEL_UNKNOWN);
            this.#mainShape.alpha = 1.0/256;*/

            this.#mainShape.graphics.moveTo(this.getRightEdgeX(), ry);
            this.#mainShape.graphics.lineTo(this.getRightEdgeX2(), ry);

            //graphics.lineStyle(Globals.LINE_WIDTH_ACTIVE, color);
            this.#mainShape.graphics.setStrokeStyle(lineWidth);
            this.#mainShape.graphics.beginStroke(color);

            this.#mainShape.graphics.moveTo(this.getRightEdgeX(), ry);
            this.#mainShape.graphics.lineTo(this.getRightEdgeX2(), ry);
        }

        //draw highliting
        if (this.#edge.highLightedGetter() === Edge.HL_TRUE) {
            this.#mainShape.graphics.setStrokeStyle(Globals.LINE_WIDTH_HL_TRUE);
            this.#mainShape.graphics.beginStroke(Globals.COLOR_HL_TRUE);
            this.#mainShape.alpha = 0.5;
            this.#mainShape.graphics.moveTo(this.#edge.v1.xGetter(), this.#edge.v1.yGetter());
            this.#mainShape.graphics.lineTo(this.#edge.v2.xGetter(), this.#edge.v2.yGetter());
            if (this.#showRightEdge) {
                //draw segment of the right edge
                this.#mainShape.graphics.moveTo(this.getRightEdgeX(), ry);
                this.#mainShape.graphics.lineTo(this.getRightEdgeX2(), ry);
            }
            /*txt2 = getEdgeLenghLabel();
            var txt2length:int = (int(txt2.text) > 9) ? 2 : 1;
            txt2.x = getRightEdgeX() - 20 - 5 * txt2length;
            txt2.y = getRightEdgeY() + rightDeltaY - 10;
            this.addChild(txt2);*/
        } else {
            this.#mainShape.alpha = 1;
        }
        /*else {
            if (txt2 != null) {
                removeChild(txt2);
                txt2 = null;
            }
        }*/

        //put length label
        this.#txt = this.#getEdgeLenghLabel(color);
        let x1 = this.#edge.v1.xGetter();
        let y1 = this.#edge.v1.yGetter();
        let x2 = this.#edge.v2.xGetter();
        let y2 = this.#edge.v2.yGetter();
        let l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        this.#txt.x = (x1 + x2) / 2 - 10 * (y1 - y2) / l - this.#txt.getMeasuredWidth() / 2;
        this.#txt.y = (y1 + y2) / 2 + 10 * (x1 - x2) / l - this.#txt.getMeasuredHeight() / 2;
        this.addChild(this.#txt);
    }

    #getEdgeLenghLabel(col) {
        if (col === Globals.COLOR_SPIDERWEB) {
            col = Globals.COLOR_SEL_UNKNOWN;
        }

        let font;
        if (!this.#edge.lastGetter()) {
            font = "bold ";
        } else {
            font = "";
        }

        font += 12 + (0 + (!this.#edge.lastGetter())) * 2 + "px " + Globals.DEFAULT_FONT;
        let result = new createjs.Text("" + this.#edge.lengthGetter(), font, col);

        return result;
    }

    getRightEdgeX() {
        return Globals.RIGHT_EDGES_X - this.#edge.lengthGetter() * Globals.SCALE_COEF / 2;
    }

    getRightEdgeX2() {
        return Globals.RIGHT_EDGES_X + this.#edge.lengthGetter() * Globals.SCALE_COEF / 2;
    }

    getRightEdgeY() {
        return Globals.getRightEdgeY(KruskalController.instanceGetter().getEdgePosition(this.#edge));
    }

    showRightEdgeGetter() {
        return this.#showRightEdge;
    }

    showRightEdgeSetter(value) {
        if (this.#showRightEdge === value) {
            return;
        }

        this.#showRightEdge = value;
        if (this.#showRightEdge) {
            this.addChild(this.#rightV1view);
            this.addChild(this.#rightV2view);
        } else {
            this.removeChild(this.#rightV1view);
            this.removeChild(this.#rightV2view);
        }

        this.repaint();
    }

    #captureEdge(e, self) {
        self.#capturePoint = new createjs.Point(e.stageX, e.stageY);
    }

    #uncaptureEdge(self) {
        self.#capturePoint = null;
        self.rightDeltaYSetter(0);
    }

    #stageMovement(e, self) {
        if (!self.#capturePoint) {
            return;
        }

        self.rightDeltaYSetter(e.stageY - self.#capturePoint.y);
        //rightDeltaY = capturePoint.y - e.stageY;

        self.dispatchEvent(new createjs.Event(EdgeView.RIGHT_EDGE_MOVED, false, false));
    }

    movableRightEdgeSetter(value) {
        if (value === this.#movableRightEdge) {
            return;
        }

        this.#movableRightEdge = value;
        let self = this;
        this.addEventListener("mousedown", function (e) {
            if (self.#movableRightEdge) {
                self.#captureEdge(e, self);
            }
        });
        this.stage.addEventListener("pressup", function () {
            if (self.#movableRightEdge) {
                self.#uncaptureEdge(self);
            }
        });
        this.stage.addEventListener("pressmove", function (e) {
            if (self.#movableRightEdge) {
                self.#stageMovement(e, self);
            }
        });
    }

    movableRightEdgeGetter() {
        return this.#movableRightEdge;
    }

    //note that the setter is private (!)
    rightDeltaYSetter(value) {
        this.#rightDeltaY = value;
        this.repaint();
    }

    rightDeltaYGetter() {
        return this.#rightDeltaY;
    }

    edgeGetter() {
        return this.#edge;
    }

    updateDelta(oldInd, newInd) {
        let d = (newInd - oldInd) * Globals.getRigthEdgesGap();
        this.rightDeltaYSetter(this.rightDeltaYGetter() - d);
        this.#capturePoint.y += d;
    }

}