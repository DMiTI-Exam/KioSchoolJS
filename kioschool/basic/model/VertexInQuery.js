/**
 * Элемент списка вершин в очереди, агрегирует вершину и номер
 * @author Akimushkin Vasiliy
 */
export class VertexInQuery {
    #number;
    #vertex;

    constructor() {
    }

    getVertex() {
        return this.#vertex;
    }

    setVertex(value) {
        this.#vertex = value;
    }

    getNumber() {
        return this.#number;
    }

    setNumber(value) {
        this.#number = value;
    }
}