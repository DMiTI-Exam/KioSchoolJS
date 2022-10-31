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
    vertexesGetter() {
        return this.#vertexes;
    }

    /**
     * Получает список ребер
     */
    edgesGetter() {
        return this.#edges;
    }

    /**
     * Устанавливает список ребер
     */
    edgesSetter(arr) {
        this.#edges = arr;
    }

    /**
     * Получает представление
     */
    viewGetter() {
        return this.#view;
    }

    /**
     * Устанавливает представление
     */
    viewSetter(value) {
        this.#view = value;
    }

    /**
     * Получает ребро по двум вершинам
     */
    getEdge(v1, v2) {
        for (let i = 0; i < this.#edges.length; i++) {
            let edge = this.#edges[i];
            if (edge.sourceGetter().idGetter()== v1.idGetter() && edge.targetGetter().idGetter() == v2.idGetter()) {
                return edge;
            }

            if (edge.sourceGetter().idGetter() == v2.idGetter() && edge.targetGetter().idGetter() == v1.idGetter()) {
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
            if (edge.sourceGetter().idGetter() == v1.idGetter() || edge.targetGetter().idGetter() == v1.idGetter()) {
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
            vertex.labeledSetter(false);
        }

        this.#label(v1);
        return v2.labeledGetter();
    }

    #label(vertex) {
        vertex.labeledSetter(true);
        for (let edge of this.#edges) {
            if (edge.sourceGetter() === vertex && !edge.targetGetter().labeledGetter()) {
                this.#label(edge.targetGetter());
            } else if (edge.targetGetter() === vertex && !edge.sourceGetter().labeledGetter()) {
                this.#label(edge.sourceGetter());
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

    vertexesSetter(value) {
        this.#vertexes = value;
    }
}