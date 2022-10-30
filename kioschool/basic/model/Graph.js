/**
 * Граф, инкапсулирует связи между вершинами и ребрами
 */
export class Graph {
    /**
     * Список вершин
     */
    #vertexes = [];

    /**
     * Список ребер
     */
    #edges = [];

    /**
     * Представление
     */
    #view;

    constructor() {
    }

    /**
     * Получает список вершин
     */
    getVertexes() {
        return this.#vertexes;
    }

    /**
     * Получает список ребер
     */
    getEdges() {
        return this.#edges;
    }

    /**
     * Устанавливает список ребер
     */
    setEdges(ar) {
        this.#edges = ar;
    }

    /**
     * Получает представление
     */
    getView() {
        return this.#view;
    }

    /**
     * Устанавливает представление
     */
    setView(value) {
        this.#view = value;
    }

    /**
     * Получает ребро по двум вершинам
     */
    getEdge(v1, v2) {
        for (let i = 0; i < this.#edges.length; i++) {
            let edge = this.#edges[i];
            if (edge.getSource().getId()== v1.getId() && edge.getTarget().getId() == v2.getId()) {
                return edge;
            }

            if (edge.getSource().getId() == v2.getId() && edge.getTarget().getId() == v1.getId()) {
                return edge;
            }

            return null;
        }
    }

    /**
     * Получает количество инцидентных ребер
     */
    getIncidentEdges(v1) {
        let sum = 0;
        for (let i = 0; i < this.#edges.length; i++) {
            let edge = this.#edges[i];
            if (edge.getSource().getId() == v1.getId() || edge.getTarget().getId() == v1.getId()) {
                sum++;
            }
        }

        return sum;
    }

    /**
     * Проверяет, существует ли путь из v1 в v2
     */
    isPath(v1, v2) {
        for (let vertex of this.#vertexes) {
            vertex.setLabeled(false);
        }

        this.#label(v1);
        return v2.isLabeled();
    }

    #label(vertex) {
        vertex.setLabeled(true);
        for (let edge of this.#edges) {
            if (edge.getSource() === vertex && !edge.getTarget().isLabeled()) {
                this.#label(edge.getTarget());
            } else if (edge.getTarget() === vertex && !edge.getSource().isLabeled()) {
                this.#label(edge.getSource());
            }
        }
    }

    removeEdge(edge) {
        let ar = this.#edges;
        this.#edges = [];
        for (let e of ar) {
            if (e !== edge) {
                edge.push(e);
            }
        }
    }

    setVertexes(value) {
        this.#vertexes = value;
    }
}