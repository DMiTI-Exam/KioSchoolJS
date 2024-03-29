import { PrimGraph } from "../model/PrimGraph.js";
import { PrimVertex } from "../model/PrimVertex.js";
import { PrimVertexView } from "../view/PrimVertexView.js";
import { CMap } from "../gui/CMap.js";
import { PrimEdge } from "../model/PrimEdge.js";
import { MathUtil } from "../../kioschool/util/MathUtil.js";
import { PrimEdgeView } from "../view/PrimEdgeView.js";
import { PrimGraphView } from "../view/PrimGraphView.js";

/**
 * Класс утилит позволяет установить связи в графе на основе расположения
 * представлений элементов графа в разбираемом swf-файле
 */
export class GraphConstructor {
    static parseGraph() {
        let graph = new PrimGraph();
        let graphView = new createjs.Container();
        let graphV = new PrimGraphView();
        graph.viewSetter(graphV);

        let content = new CMap();
        //добавляем фон
        graphView.addChild(content.getChildAt(0));

        //добавляем вершины как они есть
        for (let k = content.numChildren - 1; k >= 0; --k) {
            if (content.getChildAt(k).getChildByName("VFill1_mc") != null) {
                let vertex = new PrimVertex();
                let vertexView = new PrimVertexView(content.getChildAt(k));
                content.removeChildAt(k);
                vertex.addView(vertexView);
                vertexView.vertexSetter(vertex);
                graph.vertexesGetter().push(vertex);
                graphView.addChild(vertexView);
            }
        }

        for (let i = content.numChildren - 1; i >= 0; --i) {
            if (content.getChildAt(i).getChildByName("way_mc") != null) {
                let si = 0;
                let ti = 0;
                let v1;
                let v2;
                let edge = content.getChildAt(i);
                for (let jj = 0; jj < graph.vertexesGetter().length; jj++) {
                    let vert = graph.vertexesGetter()[jj];
                    if (GraphConstructor.#isSource(vert, edge)) {
                        v1 = vert;
                        si++;
                    } else if (GraphConstructor.#isTarget(vert, edge)) {
                        v2 = vert;
                        ti++;
                    }
                }

                if (si !== 1 || ti !== 1) {
                    console.log(si + ":" + ti);
                } else {
                    this.#addEdge(graph, graphView, v1.viewsGetter()[0], v2.viewsGetter()[0]);
                }

                content.removeChildAt(i);
            }
        }

        //добавляем подписи
        for (let j = content.numChildren - 1; j >= 0; --j) {
            let view = content.getChildAt(j);
            graphView.addChild(view);
        }

        this.#removeIntersections(graph, graphView);
        this.#tryRemoveEdges(graph, graphView, 5);
        this.#initSpaces(graph);
        console.log(graph.edgesGetter().length);
        for (let l = 0; l < graph.edgesGetter().length; ++l) {
            let ed = graph.edgesGetter()[l];
            graphView.addChildAt(ed.getView(), 1);
            ed.getView().placeTextInTheMiddle();
        }

        graphV.addChild(graphView);
        graphView.x = 10;
        graphView.y = 30;
        return graph;
    }

    static #addEdge(graph, graphView, view1, view2) {
        if (graph.getEdge(view1.vertexGetter(), view2.vertexGetter()) != null) {
            return;
        }

        let edge = new PrimEdge();
        let edgeView = new PrimEdgeView(view1, view2);
        edge.viewSetter(edgeView);
        edgeView.edgeSetter(edge);
        edge.sourceSetter(view1.vertexGetter());
        edge.targetSetter(view2.vertexGetter());
        graph.edgesGetter().push(edge);
    }

    static #removeIntersections(graph, graphView) {
        for (let i = graph.edgesGetter().length - 1; i >= 0; --i) {
            let edge = graph.edgesGetter()[i];
            for (let j = graph.edgesGetter().length - 1; j >= 0; --j) {
                let edge1 = graph.edgesGetter()[j];
                let x1 = edge.getView().x1 + edge.getView().x;
                let x2 = edge.getView().x2 + edge.getView().x;
                let y1 = edge.getView().y1 + edge.getView().y;
                let y2 = edge.getView().y2 + edge.getView().y;

                let x3 = edge1.getView().x1 + edge1.getView().x;
                let x4 = edge1.getView().x2 + edge1.getView().x;
                let y3 = edge1.getView().y1 + edge1.getView().y;
                let y4 = edge1.getView().y2 + edge1.getView().y;

                if(MathUtil.intersect(x1, y1, x2, y2, x3, y3, x4, y4)){
                    let e = (Math.random() >= 0.5) ? edge : edge1;
                    this.#removeIfPossible(graph, e);
                }
            }
        }
    }

    static #tryRemoveEdges(graph, graphView, num){
        for(let i = 0; i < num; ++i){
            let e = graph.edgesGetter()[Math.floor(Math.random()*graph.edgesGetter().length)];
            this.#removeIfPossible(graph, e);
        }
    }

    static #initSpaces(graph) {
        for (let i = 0; i < graph.edgesGetter().length; ++i) {
            let edge = graph.edgesGetter()[i];
            edge.weightSetter(Math.floor(Math.random() * 100));
        }
    }

     static #removeIfPossible(graph, edge) {
        graph.removeEdge(edge);
        if(!graph.isPath(edge.sourceGetter(), edge.targetGetter())){
            graph.edgesGetter().push(edge);
        }
    }

     static #isSource(vertex, view) {
        return (vertex.viewsGetter()[0]).hitTest((vertex.viewsGetter()[0]).globalToLocal(view.x, 0).x,
            (vertex.viewsGetter()[0]).globalToLocal(0, view.y).y);
    }

     static #isTarget(vertex, view) {
         let firstVertex = vertex.viewsGetter()[0];
         let container = new createjs.Container();
         container.addChild(_.clone(view));

         if (view.rotation >= 0 && view.rotation <= 90) {
             return firstVertex.hitTest(firstVertex.globalToLocal(view.x + container.getBounds().width, 0).x,
                 firstVertex.globalToLocal(0, view.y - container.getBounds().height).y);
         } else if (view.rotation >= 90 && view.rotation <= 180) {
             return firstVertex.hitTest(firstVertex.globalToLocal(view.x + container.getBounds().width, 0).x,
                 firstVertex.globalToLocal(0, view.y + container.getBounds().height).y);
         } else if (view.rotation >= -90 && view.rotation <= 0) {
             return firstVertex.hitTest(firstVertex.globalToLocal(view.x - container.getBounds().width, 0).x,
                 firstVertex.globalToLocal(0, view.y - container.getBounds().height).y);
         } else if (view.rotation >= -180 && view.rotation <= -90) {
             return firstVertex.hitTest(firstVertex.globalToLocal(view.x - container.getBounds().width, 0).x,
                 firstVertex.globalToLocal(0, view.y + container.getBounds().height).y);
         }

        return false;
    }
}