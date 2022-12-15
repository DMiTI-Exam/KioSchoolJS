import { GraphView } from "../view/GraphView.js";

export class DrawingGlobals {
    static #graph2view = new Map();
		
    static getGraphView(graph) {
        let gv;
        if (DrawingGlobals.#graph2view.get(graph))
            gv = DrawingGlobals.#graph2view.get(graph);
        else {
            gv = new GraphView(graph);
            DrawingGlobals.#graph2view.set(graph, gv);
        }
        
        return gv;
    }
		
    //TODO разобраться с цветами вершин, подумать про цвета ребер
}