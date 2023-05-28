import { Graph } from "../../kioschool/basic/model/Graph.js";

/**
 * Граф для алгоритма Прима, содержит дополнительные методы
 */
export class PrimGraph extends Graph {
    constructor() {
        super();
    }

    /**
     * Возвращает массив граничных ребер - ребер, одна вершина которых принадлежит дереву,
     * а вторая - нет
     */
    getBoundaryEdges() {
        let boundaryEdges = [];
        for (let edge of this.edgesGetter()) {
            if((edge.sourceGetter().inTreeGetter() && !edge.targetGetter().inTreeGetter()) ||
                (edge.targetGetter().inTreeGetter() && !edge.sourceGetter().inTreeGetter())) {
                boundaryEdges.push(edge);
            }
        }

        return boundaryEdges;
    }

    /**
     * Возвращает количество вершин в дереве
     */
    getAmountOfVertexesInTree() {
        let sum = 0;
        for (let vertex of this.vertexesGetter()) {
            if (vertex.inTreeGetter()) {
                sum += 1;
            }
        }

        return sum;
    }

    /**
     * Возвращает ребро с минимальным весом среди выделенных
     */
    getMinimumFromSelectedEdges() {
        let edge;
        for (let e of this.edgesGetter()) {
            if (e.selectedGetter() && (edge == null || e.weightGetter() < edge.weightGetter())) {
                edge = e;
            }
        }

        return edge;
    }
}