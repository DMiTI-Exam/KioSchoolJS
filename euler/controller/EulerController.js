import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { FinalStep } from "../steps/FinalStep.js";
import { GraphConstructor } from "../utils/GraphConstructor.js";
import { SelectEdgeStep } from "../steps/SelectEdgeStep.js";
import { Cycle } from "../model/Cycle.js";
import { GraphView } from "../steps/GraphView.js";

export class EulerController extends IManipulatorHelper {
    static #instance;

    static #canConstruct = false;

    #graph;
    #currentVertex;
    #initVertex;
    #cycles = [];
    pos;

    static instanceGetter() {
        if (EulerController.#instance == null) {
            EulerController.#canConstruct = true;
            EulerController.#instance = new EulerController();
            EulerController.#canConstruct = false;
        }

        return this.#instance;
    }

    constructor() {
        super();

        if (!EulerController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    regimeChanged(regime) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
            ManipulatorManager.instanceGetter().currentStepGetter().update();
        }
    }

    init() {
        this.#cycles = [];
        do {
            this.#graph = GraphConstructor.generateGraph();
        } while (this.#graph == null);
        this.#currentVertex = this.graphGetter().vertexesGetter()
            [Math.ceil(this.graphGetter().vertexesGetter().length/2 - 4)];
        this.#initVertex = this.#currentVertex;
        this.graphGetter().viewGetter().update();
        this.cyclesGetter().push(new Cycle());
    }

    firstStepGetter() {
        return new SelectEdgeStep();
    }

    graphGetter() {
        return this.#graph;
    }

    idGetter() {
        return "euler";
    }

    containFreeEdge() {
        for (let j = 0; j < this.graphGetter().edgesGetter().length; j++) {
            let edge = this.graphGetter().edgesGetter()[j];
            let inPath = false;
            for (let i = 0; i < this.cyclesGetter().length; i++) {
                if (this.cyclesGetter()[i].has(edge)) {
                    inPath = true;
                }
            }

            if (!inPath) {
                return true;
            }
        }

        return false;
    }

    currentVertexGetter() {
        return this.#currentVertex;
    }

    currentVertexSetter(value) {
        this.#currentVertex = value;
    }

    cyclesGetter() {
        return this.#cycles;
    }

    cyclesSetter(value) {
        this.#cycles = value;
    }

    getColors(edge) {
        let colors = [];
        for (let i = 0; i < this.cyclesGetter().length; i++) {
            if (this.cyclesGetter()[i].has(edge)) {
                colors.push(this.cyclesGetter()[i].colorGetter());
            }
        }

        return colors;
    }

    initVertexGetter() {
        return this.#initVertex;
    }

    initVertexSetter(value) {
        this.#initVertex = value;
    }

    getFreeEdge(vertex) {
        let edges = this.graphGetter().getIncidentEdgesList(vertex);
        let candidates = [];
        for (let i = 0; i < edges.length; i++) {
            let inPath = false;
            for (let j = 0; j < this.cyclesGetter().length; j++) {
                if (this.cyclesGetter()[j].has(edges[i])) {
                    inPath = true;
                }
            }

            if (!inPath) {
                candidates.push(edges[i]);
            }
        }

        if (candidates.length === 0) {
            return null;
        }

        let index = Math.floor(Math.random() * (candidates.length - 1));
        return candidates[index];
    }

    lastCycleGetter() {
        return this.cyclesGetter()[this.cyclesGetter().length-1];
    }

    prelastCycleGetter() {
        return this.cyclesGetter()[this.cyclesGetter().length-2];
    }

    lastCycleHasBranch() {
        if (this.cyclesGetter().length === 0) {
            return false;
        }

        return this.lastCycleGetter().containsBranch();
    }

    getNextFromPrelast() {
        return this.prelastCycleGetter().edgesGetter()[0];
    }

    removeFromPrelast(edge) {
        if (this.cyclesGetter().length > 1) {
            this.prelastCycleGetter().removeEdge(edge);
        }
    }

    removeNextFromPrelast() {
        if (this.cyclesGetter().length > 1) {
            return this.prelastCycleGetter().edgesGetter().shift();
        }

        return null;
    }

    restoreNextFromPrelast(edge) {
        if (this.cyclesGetter().length > 1) {
            this.prelastCycleGetter().edgesGetter().unshift(edge);
        }
    }

    prelastEmpty() {
        if (this.cyclesGetter().length > 1) {
            return this.prelastCycleGetter().edgesGetter().length === 0;
        }

        return true;
    }

    isFreeEdge(vertex, e) {
        let edges = this.graphGetter().getIncidentEdgesList(vertex);
        let candidates = [];
        for (let i = 0; i < edges.length; i++) {
            let inPath = false;
            for (let j = 0; j < this.cyclesGetter().length; j++) {
                if (this.cyclesGetter()[j].has(edges[i])) {
                    inPath = true;
                }
            }

            if (!inPath) {
                candidates.push(edges[i]);
            }
        }

        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i] === e) {
                return true;
            }
        }

        if (candidates.length > 0) {
            return false;
        }

        let c;
        if (vertex === EulerController.instanceGetter().initVertexGetter() &&
            EulerController.instanceGetter().getFreeEdge(vertex) == null &&
            EulerController.instanceGetter().prelastEmpty()) {
            c = this.lastCycleGetter();
        } else {
            if (this.cyclesGetter().length < 2) {
                c = this.lastCycleGetter();
            } else {
                c = this.prelastCycleGetter();
            }
        }

        if (e === c.edgesGetter()[0]) {
            return true;
        }

        return false;
    }

    removeEdgeFromCycle(edge) {
        for (let i = 0; i < this.cyclesGetter().length; i++) {
            if (this.cyclesGetter()[i].has(edge)) {
                this.pos = this.cyclesGetter()[i].removeEdgeAndGetPos(edge);
                return this.cyclesGetter()[i];
            }
        }

        return null;
    }

    getPos() {
        return this.pos;
    }

    redrawInFinalGetter() {
        return true;
    }

    redraw(workspace) {
        new GraphView(false).draw(workspace);
    }

    needKeyboard() {
        return false;
    }
}