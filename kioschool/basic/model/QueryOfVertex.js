import { VertexInQuery } from "./VertexInQuery.js";

/**
 * Список нумерованных вершин
 */
export class QueryOfVertex {
    #array = [];

    constructor(arr) {
        for (let i = 0; i < arr.length; i++) {
            let vertex = arr[i];
            let vertexInQuery = new VertexInQuery();
            vertexInQuery.setVertex(vertex);
            vertexInQuery.setNumber(-1);
            this.#array.push(vertexInQuery);
        }
    }

    getArray() {
        return this.#array;
    }

    getLast() {
        let num = -1;
        let v = null;
        let vv = null;
        for (let i = 0; i < this.#array.length; i++) {
            let vertex = this.#array[i];
            if (vertex.getNumber() > num) {
                num = vertex.getNumber();
                v = vertex.getVertex();
                vv = vertex;
            }
        }

        return v;
    }

    popLast() {
        let num = -1;
        let v = null;
        let vv = null;
        for (let i = 0; i < this.#array.length; i++) {
            let vertex = this.#array[i];
            if (vertex.getNumber() > num) {
                num = vertex.getNumber();
                v = vertex.getVertex();
                vv = vertex;
            }
        }

        if (vv != null) {
            vv.setNumber(-1);
        }

        return v;
    }
}