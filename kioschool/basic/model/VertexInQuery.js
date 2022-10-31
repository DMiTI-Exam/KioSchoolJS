/**
 * Элемент списка вершин в очереди, агрегирует вершину и номер
 * @author Akimushkin Vasiliy
 */
export class VertexInQuery {
    #number;
    #vertex;

    constructor() {
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    numberGetter() {
        return this.#number;
    }

    numberSetter(value) {
        this.#number = value;
    }
}