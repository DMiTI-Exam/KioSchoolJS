export class Path {
    #source;
    #target;
    #edges = [];

    constructor(source) {
        this.#source = source;
    }

    sourceGetter() {
        return this.#source;
    }

    sourceSetter(value) {
        this.#source = value;
    }

    targetGetter() {
        return this.#target;
    }

    targetSetter(value) {
        this.#target = value;
    }

    edgesGetter() {
        return this.#edges;
    }

    edgesSetter(value) {
        this.#edges = value;
    }

    hasEsge(e) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i] === e) {
                return true;
            }
        }

        return false;
    }

    isFinished() {
        return this.targetGetter() != null;
    }

    copy() {
        let path = new Path(this.#source);
        for (let i = 0; i < this.edgesGetter().length; i++) {
            path.edgesGetter().push(this.edgesGetter()[i]);
        }

        path.targetSetter(this.targetGetter());
        return path;
    }

    getLastVertex() {
        let vertex = this.sourceGetter();

        for (let i = 0; i < this.edgesGetter().length; i++) {
            vertex = this.edgesGetter()[i].getAnother(vertex);
        }

        return vertex;
    }

    concur(graph) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (!this.edgesGetter()[i].selectedGetter()) {
                return false;
            }
        }

        if (!this.sourceGetter().sourceTargetSelectedGetter()) {
            return false;
        }

        if (!this.targetGetter().sourceTargetSelectedGetter()) {
            return false;
        }

        for (let i = 0; i < graph.vertexesGetter().length; i++) {
            if (graph.vertexesGetter()[i].sourceTargetSelectedGetter() &&
                graph.vertexesGetter()[i] !== this.sourceGetter() &&
                graph.vertexesGetter()[i] !== this.targetGetter()) {
                return false;
            }
        }

        for (let i = 0; i < graph.edgesGetter().length; i++) {
            if (graph.edgesGetter()[i].selectedGetter() && !this.hasEsge(graph.edgesGetter()[i])) {
                return false;
            }
        }

        return true;
    }
}