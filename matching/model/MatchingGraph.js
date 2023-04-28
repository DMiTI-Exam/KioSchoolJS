import { Graph } from '../../kioschool/basic/model/Graph.js'
import { Path } from "./Path.js";
import { MatchingSourceTargetSelectorView } from "../views/MatchingSourceTargetSelectorView.js";
import { MatchingEdgeSelectorView } from "../views/MatchingEdgeSelectorView.js";

/**
 * Граф для алгоритма построения максимального парасочетания
 */
export class MatchingGraph extends Graph {
    #sources = [];
    #targets = [];
    #chainView;
    #reverse = false;

    constructor() {
        super();
    }

    hasSecondPartNeighbour(vertex) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i].sourceGetter() === vertex &&
                !this.edgesGetter()[i].targetGetter().firstPartGetter()) {
                return true;
            } else if (this.edgesGetter()[i].targetGetter() === vertex &&
                !this.edgesGetter()[i].sourceGetter().firstPartGetter()) {
                return true;
            }
        }

        return false;
    }

    buildSourcesAndTargets() {
        this.#sources = [];
        this.#targets = [];
        
        for (let i = 0; i < this.vertexesGetter().length; i++) {
            if (!this.vertexesGetter()[i].dotMarkedGetter()) {
                continue;
            }

            if (this.vertexesGetter()[i].firstPartGetter()) {
                this.sourcesGetter().push(this.vertexesGetter()[i]);
            } else {
                this.targetsGetter().push(this.vertexesGetter()[i]);
            }
        }
    }

    sourcesGetter() {
        return this.#sources;
    }

    sourcesSetter(value) {
        this.#sources = value;
    }

    targetsGetter() {
        return this.#targets;
    }

    targetsSetter(value) {
        this.#targets = value;
    }

    removeFirstSource() {
        this.sourcesGetter().splice(0, 1);
    }

    hasTarget(vertex) {
        for (let i = 0; i < this.targetsGetter().length; i++) {
            if (!vertex.lastSourceTargetSelectedGetter() && this.targetsGetter()[i] === vertex) {
                return true;
            }
        }

        return false;
    }

    removeTarget(vertex) {
        for (let i = 0; i < this.targetsGetter().length; i++) {
            if (this.targetsGetter()[i] === vertex) {
                this.targetsGetter().splice(i, 1);
                return;
            }
        }
    }

    getPaths(source, reverseSwitched = false) {
        let paths = [];
        paths.push(new Path(source));
        while (this.hasUnfinished(paths) && paths.length < 100) {
            this.#appendToPaths(paths, reverseSwitched);
        }

        return paths;
    }

    #appendToPaths(paths, reverseSwitched = false) {
        this.#reverse = reverseSwitched;
        for (let i = 0; i < paths.length; i++) {
            if (!paths[i].isFinished()) {
                let path = paths[i];
                paths.splice(i, 1);
                if (path.edgesGetter().length % 2 === 0){
                    for (let j = 0; j < this.getDirectEdges(path.getLastVertex(), path).length; j++) {
                        let path1 = path.copy();
                        path1.edgesGetter().push(this.getDirectEdges(path.getLastVertex(), path)[j]);
                        paths.push(path1);
                    }
                } else {
                    for (let j = 0; j < this.getUndirectEdges(path.getLastVertex(), path).length; j++) {
                        let path1 = path.copy();
                        path1.edgesGetter().push(this.getUndirectEdges(path.getLastVertex(), path)[j]);
                        paths.push(path1);
                    }

                    if (this.hasTarget(path.getLastVertex())) {
                        path.targetSetter(path.getLastVertex());
                        paths.push(path);
                    }
                }

                return;
            }
        }
    }

    getDirectEdges(vertex, path) {
        let edgesList = [];
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (path.edgesGetter().length > 0 &&
                path.edgesGetter()[path.edgesGetter().length - 1] === this.edgesGetter()[i]) {
                continue;
            }

            if (this.edgesGetter()[i].deletedGetter()) {
                continue;
            }

            if (this.edgesGetter()[i].sourceGetter() === vertex && this.#direct(i, path)) {
                edgesList.push(this.edgesGetter()[i]);
            } else if (this.edgesGetter()[i].targetGetter() === vertex && this.#direct(i, path)) {
                edgesList.push(this.edgesGetter()[i]);
            }
        }

        return edgesList;
    }

    #direct(i, path) {
        if (this.#reverse) {
            return (this.edgesGetter()[i].switchedGetter() && (this.#count(path, this.edgesGetter()[i]) === 0));
        } else {
            return (!this.edgesGetter()[i].switchedGetter() && (this.#count(path, this.edgesGetter()[i]) === 0));
        }
    }

    #undirect(i, path) {
        if (this.#reverse) {
            return (!this.edgesGetter()[i].switchedGetter() && (this.#count(path, this.edgesGetter()[i]) === 0));
        } else {
            return (this.edgesGetter()[i].switchedGetter() && (this.#count(path, this.edgesGetter()[i]) === 0));
        }
    }

    #count(path, edge) {
        let count = 0;
        for (let i = 0; i < path.edgesGetter().length; i++) {
            if (path.edgesGetter()[i] === edge) {
                count++;
            }
        }

        return count;
    }

    getUndirectEdges(vertex, path) {
        let edgesList = [];
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (path.edgesGetter().length > 0 &&
                path.edgesGetter()[path.edgesGetter().length - 1] === this.edgesGetter()[i]) {
                continue;
            }

            if (this.edgesGetter()[i].deletedGetter()) {
                continue;
            }

            if (this.edgesGetter()[i].sourceGetter() === vertex && this.#undirect(i, path)) {
                edgesList.push(this.edgesGetter()[i]);
            } else if (this.edgesGetter()[i].targetGetter() === vertex && this.#undirect(i, path)) {
                edgesList.push(this.edgesGetter()[i]);
            }
        }

        return edgesList;
    }

    hasUnfinished(paths) {
        for (let i = 0; i < paths.length; i++) {
            if (!paths[i].isFinished()) {
                return true;
            }
        }

        return false;
    }

    chainViewGetter() {
        return this.#chainView;
    }

    chainViewSetter(value) {
        this.#chainView = value;
    }

    markedOnlyInApprovedEdge(v1) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (!this.edgesGetter()[i].approvedGetter()) {
                continue;
            }

            if (this.edgesGetter()[i].sourceGetter() === v1 ||
                this.edgesGetter()[i].targetGetter() === v1) {
                v1.dotMarkedSetter(true);
                return;
            }
        }

        v1.dotMarkedSetter(false);
    }

    getFirstSource() {
        for (let i = 0; i < this.sourcesGetter().length; i++) {
            if (!this.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                return this.sourcesGetter()[i];
            }
        }

        return null;
    }

    getFinalPath() {
        let globalPath = [];
        for (let i = 0; i < this.sourcesGetter().length; i++) {
            if (!this.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                let paths = this.getPaths(this.sourcesGetter()[i])
                for (let j = 0; j < paths.length; j++) {
                    if (paths[j].isFinished()) {
                        return paths[j];
                    }
                }
            }
        }

        return null;
    }

    getAllFinalPath() {
        let globalPath = [];

        for (let i = 0; i < this.sourcesGetter().length; i++) {
            if (!this.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                let paths = this.getPaths(this.sourcesGetter()[i], true);
                for (let j = 0; j < paths.length; j++) {
                    if (paths[j].isFinished()) {
                        globalPath.push(paths[j])
                    }
                }
            }
        }

        return globalPath;
    }

    rebuildViews() {
        for (let i = this.chainViewGetter().numChildren - 1; i >= 0; i--) {
            if ((this.chainViewGetter().getChildAt(i) instanceof MatchingSourceTargetSelectorView) ||
                (this.chainViewGetter().getChildAt(i) instanceof MatchingEdgeSelectorView)) {
                this.chainViewGetter().removeChildAt(i);
            }
        }

        for (let i = 0; i < this.sourcesGetter().length; i++) {
            if (this.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                continue;
            }

            let v = new MatchingSourceTargetSelectorView(this.sourcesGetter()[i], 10);
            this.chainViewGetter().addChild(v);
            v.x = 10;
            v.y = 170;
            v.update();
        }

        for (let i = 0; i < this.targetsGetter().length; i++) {
            if (this.targetsGetter()[i].lastSourceTargetSelectedGetter()) {
                continue;
            }

            let v = new MatchingSourceTargetSelectorView(this.targetsGetter()[i], 320);
            this.chainViewGetter().addChild(v);
            v.x = 320;
            v.y = 170;
            v.update();        
        }

        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (!this.edgesGetter()[i].approvedGetter()) {
                continue;
            }

            if (this.edgesGetter()[i].sourceGetter().firstPartGetter() ===
                this.edgesGetter()[i].targetGetter().firstPartGetter()) {
                continue;
            }

            let vv = new MatchingEdgeSelectorView(this.edgesGetter()[i]);
            this.chainViewGetter().addChild(vv);
            vv.x = this.edgesGetter()[i].sourceGetter().chainXGetter();
            vv.y = this.edgesGetter()[i].sourceGetter().chainYGetter();
            vv.update();
        }
    }  
}   