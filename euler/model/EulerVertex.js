import { Vertex } from "../../kioschool/basic/model/Vertex.js";

export class EulerVertex extends Vertex {
    static NORTH_NEIGHBOUR = 0;

    static SOUTH_NEIGHBOUR = 1;

    static WEST_NEIGHBOUR = 2;

    static EAST_NEIGHBOUR = 3;

    static NORTH_EAST_NEIGHBOUR = 4;

    static NORTH_WEST_NEIGHBOUR = 5;

    static SOUTH_EAST_NEIGHBOUR = 6;

    static SOUTH_WEST_NEIGHBOUR = 7;

    static pairs = [[EulerVertex.NORTH_NEIGHBOUR, EulerVertex.SOUTH_NEIGHBOUR],
                    [EulerVertex.WEST_NEIGHBOUR,EulerVertex.EAST_NEIGHBOUR],
                    [EulerVertex.NORTH_EAST_NEIGHBOUR,EulerVertex.SOUTH_WEST_NEIGHBOUR],
                    [EulerVertex.NORTH_WEST_NEIGHBOUR,EulerVertex.SOUTH_EAST_NEIGHBOUR]];

    #component = 0;
    #neighbours = new Map();
    #activeNeighbours = new Map();
    #x;
    #y;

    constructor(x, y) {
        super();

        this.#x = x;
        this.#y = y;
    }

    xGetter() {
        return this.#x;
    }

    xSetter(value) {
        this.#x = value;
    }

    yGetter() {
        return this.#y;
    }

    ySetter(value) {
        this.#y = value;
    }

    neighboursGetter() {
        return this.#neighbours;
    }

    neighboursSetter(value) {
        this.#neighbours = value;
    }

    activeNeighboursGetter() {
        return this.#activeNeighbours;
    }

    activeNeighboursSetter(value) {
        this.#activeNeighbours = value;
    }

    activateNeighbour(type) {
        this.activeNeighboursGetter().set(type, this.neighboursGetter().get(type));
        this.neighboursGetter().get(type).activeNeighboursGetter().set(this.#getAntitype(type), this);
    }

    #getAntitype(type) {
        for (let i = 0; i < EulerVertex.pairs.length; i++) {
            if (EulerVertex.pairs[i][0] === type) {
                return EulerVertex.pairs[i][1];
            } else if (EulerVertex.pairs[i][1] === type) {
                return EulerVertex.pairs[i][0];
            }
        }

        return null;
    }

    notUseGetter() {
        if (EulerVertex.countKeys(this.activeNeighboursGetter()) === 4) {
            return true;
        }

        if (EulerVertex.countKeys(this.activeNeighboursGetter()) === 2) {
            for (let i = 0; i < EulerVertex.pairs.length; i++) {
                if (this.activeNeighboursGetter().get(EulerVertex.pairs[i][0]) != null &&
                    this.activeNeighboursGetter().get(EulerVertex.pairs[i][1]) != null) {
                    return true;
                }
            }
        }

        return false;
    }

    static countKeys(myDictionary) {
        let n = 0;
        for (let key of myDictionary.keys()) {
            n++;
        }

        return n;
    }

    componentGetter() {
        return this.#component;
    }

    componentSetter(value) {
        this.#component = value;
    }
}