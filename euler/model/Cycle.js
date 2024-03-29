import { EulerController } from "../controller/EulerController.js";

export class Cycle {
    static colors = ["#7CFC00", "#00FFFF"];

    static #count = 0;

    #color;
    #edges = [];

    constructor() {
        this.#color = Cycle.colors[Cycle.#count];
        if (EulerController.instanceGetter().cyclesGetter().length > 0 &&
            this.#color === EulerController.instanceGetter().lastCycleGetter().colorGetter()) {
            Cycle.#count++;
            if (Cycle.#count > Cycle.colors.length - 1) {
                Cycle.#count = 0;
            }

            this.#color = Cycle.colors[Cycle.#count];
        }

        Cycle.#count++;
        if (Cycle.#count > Cycle.colors.length - 1) {
            Cycle.#count = 0;
        }
    }

    colorGetter() {
        return this.#color;
    }

    colorSetter(value) {
        this.#color = value;
    }

    edgesGetter() {
        return this.#edges;
    }

    edgesSetter(value) {
        this.#edges = value;
    }

    has(edge) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i] === edge) {
                return true;
            }
        }

        return false;
    }

    containsBranch() {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i].sourceGetter() !== EulerController.instanceGetter().initVertexGetter() &&
                EulerController.instanceGetter().getFreeEdge(this.edgesGetter()[i].sourceGetter()) != null) {
                return true;
            }

            if (this.edgesGetter()[i].targetGetter() !== EulerController.instanceGetter().initVertexGetter() &&
                EulerController.instanceGetter().getFreeEdge(this.edgesGetter()[i].targetGetter()) != null) {
                return true;
            }
        }

        return false;
    }

    removeEdge(edge) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i] === edge) {
                this.edgesGetter().splice(i, 1);
                return;
            }
        }
    }

    removeEdgeAndGetPos(edge) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i] === edge) {
                this.edgesGetter().splice(i, 1);
                return i;
            }
        }

        return -1;
    }
}