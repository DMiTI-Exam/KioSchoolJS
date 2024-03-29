import { EulerVertex } from "../model/EulerVertex.js";
import { EulerVertexView } from "../view/EulerVertexView.js";
import { EulerGraph } from "../model/EulerGraph.js";
import { EulerGraphView } from "../view/EulerGraphView.js";
import { EulerEdgeView } from "../view/EulerEdgeView.js";
import { EulerEdge } from "../model/EulerEdge.js";

export class GraphConstructor {
    static #graph;

    static #graphView;

    static generateGraph() {
        this.#graph = new EulerGraph();
        this.#graphView = new EulerGraphView(this.#graph);

        this.#graph.viewSetter(this.#graphView);

        let xDimension = 6;
        let yDimension = 5;
        let space = 100;
        let border = 20;

        for (let i = 0; i < yDimension; i++) {
            for (let j = 0; j < xDimension; j++) {
                let vertex = new EulerVertex(border + space * j, border + space * i);
                let vertexView = new EulerVertexView(vertex);
                vertex.viewsGetter().push(vertexView);
                this.#graph.vertexesGetter().push(vertex);
                this.#graphView.addChild(vertexView);
            }
        }

        for (let i = 0; i < yDimension; i++) {
            for (let j = 0; j < xDimension; j++) {
                let vertex = this.#graph.vertexesGetter()[i*xDimension+j];
                if (j < xDimension - 1) {
                    vertex.neighboursGetter().set(EulerVertex.EAST_NEIGHBOUR,
                        this.#graph.vertexesGetter()[i*xDimension+j+1]);
                    if (i < yDimension - 1) {
                        vertex.neighboursGetter().set(EulerVertex.SOUTH_EAST_NEIGHBOUR,
                            this.#graph.vertexesGetter()[i*xDimension+j+xDimension+1]);
                    }

                    if (i > 0) {
                        vertex.neighboursGetter().set(EulerVertex.NORTH_EAST_NEIGHBOUR,
                            this.#graph.vertexesGetter()[i*xDimension+j-xDimension+1]);
                    }
                }

                if (j > 0) {
                    vertex.neighboursGetter().set(EulerVertex.WEST_NEIGHBOUR,
                        this.#graph.vertexesGetter()[i*xDimension+j-1]);
                    if (i < yDimension - 1) {
                        vertex.neighboursGetter().set(EulerVertex.SOUTH_WEST_NEIGHBOUR,
                            this.#graph.vertexesGetter()[i*xDimension+j+xDimension-1]);
                    }

                    if (i > 0) {
                        vertex.neighboursGetter().set(EulerVertex.NORTH_WEST_NEIGHBOUR,
                            this.#graph.vertexesGetter()[i*xDimension+j-xDimension-1]);
                    }
                }

                if (i < yDimension - 1) {
                    vertex.neighboursGetter().set(EulerVertex.SOUTH_NEIGHBOUR,
                        this.#graph.vertexesGetter()[i*xDimension+j+xDimension]);
                }

                if (i > 0) {
                    vertex.neighboursGetter().set(EulerVertex.NORTH_NEIGHBOUR,
                        this.#graph.vertexesGetter()[i*xDimension+j-xDimension]);
                }
            }
        }

        this.#generateMaxEdgesFromZeroToOne(this.#graph.vertexesGetter()[7]);
        this.#generateMaxEdgesFromZeroToOne(this.#graph.vertexesGetter()[10]);
        this.#generateMaxEdgesFromZeroToOne(this.#graph.vertexesGetter()[19]);
        this.#generateMaxEdgesFromZeroToOne(this.#graph.vertexesGetter()[22]);

        while (this.#getSingleVertex() != null) {
            let vertex = this.#getSingleVertex();
            if (!this.#stepWorm(vertex)) {
                return null;
            }
        }

        if (!this.#checkConnectivity()) {
            return null;
        }

        this.#graph.viewSetter(this.#graphView);
        this.#graphView.update();

        return this.#graph;
    }

    static #checkConnectivity() {
        let arr = [this.#graph.vertexesGetter()[0]];
        while (arr.length !== 0) {
            let v = arr.shift();
            v.componentSetter(1);
            let edges = this.#graph.getIncidentEdgesList(v);
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].getAnother(v).componentGetter() !== 1) {
                    arr.push(edges[i].getAnother(v));
                }
            }
        }

        for (let i = this.#graph.vertexesGetter().length-1; i >= 0; i--) {
            if (this.#graph.vertexesGetter()[i].componentGetter() === 0 &&
                this.#graph.getIncidentEdges(this.#graph.vertexesGetter()[i]) !== 0) {
                return false;
            }

            if (this.#graph.getIncidentEdges(this.#graph.vertexesGetter()[i]) === 0) {
                this.#graph.vertexesGetter().splice(i, 1);
            }
        }

        return true;
    }

    static #getSingleVertex() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (this.countKeys(this.#graph.vertexesGetter()[i].activeNeighboursGetter()) === 1) {
                return this.#graph.vertexesGetter()[i];
            }
        }

        return null;
    }

    static #stepWorm(vertex) {
        if (this.countKeys(vertex.activeNeighboursGetter()) === 1) {
            let count = 0;
            let type;
            do {
                type = this.#generateType();
                count++;
            } while (!this.#canGo(vertex, type) && count < 20);

            if (!this.#canGo(vertex, type)) {
                console.log("pipec");
                return false;
            } else {
                this.#addEdge(vertex, type);
                return this.#stepWorm(vertex.neighboursGetter().get(type));
            }
        }

        if (this.countKeys(vertex.activeNeighboursGetter()) === 2) {
            return true;
        }

        console.log("pipec-2");
        return false;
    }

    static #canGo(vertex, type) {
        return vertex.activeNeighboursGetter().get(type) == null && vertex.neighboursGetter().get(type) != null &&
            (this.countKeys(vertex.neighboursGetter().get(type).activeNeighboursGetter()) === 0
            || this.countKeys(vertex.neighboursGetter().get(type).activeNeighboursGetter()) === 1);
    }

    static #goodJoin(vertex, type) {
        for (let i = 0; i < EulerVertex.pairs.length; i++) {
            if (type === EulerVertex.pairs[i][0]) {
                return vertex.neighboursGetter().get(type).activeNeighboursGetter().get(EulerVertex.pairs[i][1]) != null;
            } else if (type === EulerVertex.pairs[i][1]) {
                return vertex.neighboursGetter().get(type).activeNeighboursGetter().get(EulerVertex.pairs[i][0]) != null;
            }
        }

        return false;
    }

    static #generateType() {
        let index = Math.random() > 0.75 ? 0 : Math.random() > 0.66 ? 1 : Math.random() > 0.5 ? 2 : 3;
        let type = EulerVertex.pairs[index][Math.random() > 0.5 ? 1 : 0];
        return type;
    }

    static #generateMaxEdgesFromZeroToOne(vertex) {
        if (this.countKeys(vertex.activeNeighboursGetter()) === 0) {
            let index = Math.random() > 0.75 ? 0 : Math.random() > 0.66 ? 1 : Math.random() > 0.5 ? 2 : 3;
            this.#addEdge(vertex, EulerVertex.pairs[index][0]);
            this.#addEdge(vertex, EulerVertex.pairs[index][1]);
        }

        if (this.countKeys(vertex.activeNeighboursGetter()) === 1) {
            for (let i = 0; i < EulerVertex.pairs.length; i++) {
                if (vertex.activeNeighboursGetter().get(EulerVertex.pairs[i][0]) != null) {
                    this.#addEdge(vertex, EulerVertex.pairs[i][1]);
                } else if (vertex.activeNeighboursGetter().get(EulerVertex.pairs[i][1]) != null) {
                    this.#addEdge(vertex, EulerVertex.pairs[i][0]);
                }
            }
        }

        if (this.countKeys(vertex.activeNeighboursGetter()) === 2) {
            let index = Math.random() > 0.75 ? 0 : Math.random() > 0.66 ? 1 : Math.random() > 0.5 ? 2 : 3;
            while (vertex.activeNeighboursGetter().get(EulerVertex.pairs[index][0]) != null) {
                index = Math.random() > 0.75 ? 0 : Math.random() > 0.66 ? 1 : Math.random() > 0.5 ? 2 : 3;
            }

            this.#addEdge(vertex, EulerVertex.pairs[index][0]);
            this.#addEdge(vertex, EulerVertex.pairs[index][1]);
        }
    }

    static #addEdge(vertex, type) {
        vertex.activateNeighbour(type);
        let edge = new EulerEdge(vertex, vertex.neighboursGetter().get(type));
        let view = new EulerEdgeView(edge);
        edge.viewSetter(view);
        this.#graph.edgesGetter().push(edge);
        this.#graph.viewGetter().addChildAt(view, 0);
    }

    static countKeys(myDictionary) {
        let n = 0;
        for (let key of myDictionary.keys()) {
            n++;
        }

        return n;
    }

    static #addEdges(vertex, neighbours) {
        let edgeAmount = this.#graph.getIncidentEdges(vertex);
        let size = 0;
        if (edgeAmount === 0) {
            size = Math.random() > 0.4 ? 4 : 2;
        } else if (edgeAmount === 2) {
            size = Math.random() > 0.4 ? 2 : 0;
        }

        while (size > neighbours.length) {
            size -= 2;
        }

        this.#randomSort(neighbours);
        for (let i = 0; i < size; i++) {
            let edge = new EulerEdge(vertex, neighbours.get(i));
            let view = new EulerEdgeView(edge);
            edge.viewSetter(view);
            this.#graph.edgesGetter().push(edge);
            this.#graph.viewGetter().addChildAt(view, 0);
        }

        if (this.#graph.getIncidentEdges(vertex) === 0) {
            this.#graph.viewGetter().removeChild(vertex.viewsGetter()[0]);
        }
    }

    static #randomSort(vector) {
        if (vector.length === 0) {
            return;
        }

        let index = new Uint32Array(1);
        let value;
        let q = new Uint32Array(1);
        for (q[0] = vector.length - 1; q[0] > 0; q[0] -= 1) {
            index[0] = Math.random() * (q + 1);
            if (q[0] === index[0]) {
                continue;
            }

            value = vector.get(index[0]);
            vector.set(index[0], vector.get(q[0]));
            vector.set(q[0], value);
        }
    }
}