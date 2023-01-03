import { Graph } from "../../kioschool/basic/model/Graph.js";

/**
 * Граф для алгоритма Прима, содержит дополнительные методы
 */
export class DijkstraGraph extends Graph {

    constructor() {
        super();
    }

    /**
     * Возвращает количество вершин в дереве
     */
    getAmountOfVertexesInTree(){
        let sum = 0;
        for (let vertex of this.vertexesGetter()) {
            if (vertex.inTreeGetter()) {
                sum += 1;
            }
        }

        return sum;
    }

    /**
     * Получает невыделенную вершину с минимальной стоимостью - вершину,
     * которая первой из оставшихся будет включена в дерево
     * @return
     */
    getNextSelection() {
        let vert = null;
        for (let i = 0; i < this.vertexesGetter().length; i++) {
            let vertex = this.vertexesGetter()[i];
            if ((vert == null || vert.weightGetter() > vertex.weightGetter()) && !vertex.inTreeGetter()) {
                vert = vertex;
            }
        }

        return vert;
    }

    /**
     * Возвращает список смежных для данной вершин.
     * @param	v
     * @return
     */
    getAdjWith(v) {
        let adjVertexes = [];
        for (let i = 0; i < this.edgesGetter().length; i++) {
            let edge = this.edgesGetter()[i];
            let vertex = null;
            if (edge.sourceGetter() === v && !edge.targetGetter().inTreeGetter()) {
                vertex = edge.targetGetter();
            } else if (edge.targetGetter() === v && !edge.sourceGetter().inTreeGetter()) {
                vertex = edge.sourceGetter();
            }

            if (vertex != null) {
                adjVertexes.push(vertex);
            }
        }

        return adjVertexes;
    }

    /**
     * Получает ребро, соединяющее данную вершину с деревом
     * @param	v1
     * @return
     */
     getEdgeToTree(v1) {
        let ee = null;
        let curWeight = 1000;
        for (let i = 0; i < this.vertexesGetter().length; i++) {
            let vertex = this.vertexesGetter()[i];
            if (!vertex.inTreeGetter()) {
                continue;
            }

            let e = this.getEdge(v1, vertex);
            if (e != null) {
                let weight = e.weightGetter() + vertex.weightGetter();
                if (ee == null || curWeight > weight){
                    ee = e;
                    curWeight = weight;
                }
            }
        }

        return ee;
    }
}