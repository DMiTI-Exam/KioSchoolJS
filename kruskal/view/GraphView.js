import { Globals } from "../utils/Global.js";
import { Vertex } from "../model/Vertex.js";
import { VertexView } from "./VertexView.js";
import { EdgeView } from "./EdgeView.js";
import { EventEdge } from "../model/EventEdge.js";
import { KruskalController } from "../controller/KruskalController.js";
import { SelectEdgeControl } from "./SelectEdgeControl.js";

export class GraphView extends createjs.Container {
    static EDGE_CLICKED = "edge clicked";

    #graph;
    #edgeViews = new Map(); //edge -> edge view
    #rightEdgeSelectionBox = false;
    #selectEdgeControl;
    #mainShape;

    constructor(graph) {
        super();

        this.#mainShape = new createjs.Shape();
        this.#mainShape.setBounds(0, 0, 40, 40);
        this.addChild(this.#mainShape);

        this.scaleX = 0.9;
        this.scaleY = 0.9;
        /*this.graph = graph;
        var chkbx:CheckBox = new CheckBox();
        chkbx.label = "Всегда показывать веса ребер";
        chkbx.x = 60;
        chkbx.y = 20;
        addChild(chkbx);*/

        //draw spider web (radiuses with end points)
        this.#mainShape.graphics.setStrokeStyle(Globals.LINE_WIDTH_NOTACTIVE)
        this.#mainShape.graphics.beginStroke(Globals.COLOR_SPIDERWEB);
        //var center:Vertex = new Vertex(0, 0);
        //addChild(new VertexView(center))
        for (let i = 0; i < Globals.RAYS_COUNT; i++)
        {
            let curend = new Vertex(i, Globals.RAY_LENGTH[i]);
            let curendV = new VertexView(curend);
            this.addChild(curendV);
            curend.colorSetter(-2);
            this.#mainShape.graphics.moveTo(Globals.GRAPH_CENTER_X, Globals.GRAPH_CENTER_Y);
            this.#mainShape.graphics.lineTo(curend.xGetter(), curend.yGetter());
        }

        //draw edges
        let self = this;
        for (let e of graph.edgesGetter()) {
            let ev = new EdgeView(e);
            this.#edgeViews.set(e, ev);
            let f = function (t) {
                return function() {
                        self.dispatchEvent(new EventEdge(t, GraphView.EDGE_CLICKED));
                }
            }(e);
            ev.addEventListener("click", f);
            this.addChild(ev);

            ev.addEventListener(EdgeView.RIGHT_EDGE_MOVED, function(edgeView) {
                return function() {
                    let d = edgeView.rightDeltaYGetter();
                    let oldInd = KruskalController.instanceGetter().getEdgePosition(edgeView.edgeGetter());
                    let newInd = oldInd + Math.round(d / Globals.getRigthEdgesGap());
                    if (newInd >= graph.edgesGetter().length) {
                        newInd = graph.edgesGetter().length - 1;
                    }

                    if (newInd < 0) {
                        newInd = 0;
                    }

                    if (newInd === oldInd) {
                        return;
                    }

                    KruskalController.instanceGetter().moveEdgeToPosition(edgeView.edgeGetter(), newInd);

                    //redraw all edges
                    for (let ev of self.#edgeViews.values()) {
                        ev.repaint();
                    }

                    edgeView.updateDelta(oldInd, newInd);
                }
            } (ev));
        }

        for (let v of graph.verticesGetter()) {
            this.addChild(new VertexView(v));
        }

    }

    rigthEdgesMovableSetter(value) {
        for (let ev of this.#edgeViews.values()) {
            ev.movableRightEdgeSetter(value);
        }
    }

    righEdgeSelectionBoxSetter(value) {
        this.#rightEdgeSelectionBox = value;
        this.repaintRightSelectionEdgeBox();
    }

    repaintRightSelectionEdgeBox() {
        if (this.#selectEdgeControl != null) {
            this.removeChild(this.#selectEdgeControl);
        }
        this.#selectEdgeControl = null;
        if (this.#rightEdgeSelectionBox) {
            this.#selectEdgeControl = new SelectEdgeControl(this.getViewByEdge(
                KruskalController.instanceGetter().graphGetter().lastEdgeGetter()));
            this.addChild(this.#selectEdgeControl);
        }
    }

    getViewByEdge(e) {
        return this.#edgeViews.get(e);
    }
}