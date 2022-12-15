import { Utils } from "../utils/Utils.js";
import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { Graph } from "../model/Graph.js";
import { SortStep } from "../steps/SortStep.js";

export class KruskalController extends IManipulatorHelper {
    static ID = "kruskal";

    static #g = new Graph();

    /**
     *  Singletone
     */
    static #instance;

    static #canConstruct = false;

    //to support different directions for sedge sorting
    /*private let _fromTopToBottom:Boolean;
    private let _direction:Boolean;*/
    #edge2number = new Map(); /* Edge -> int */
    #colorTable; // step no -> vertex -> color, Array of Dictionary
    //private let edgeSelectionHistory:Array; // step no -> {'edge' -> edge, 'sel' -> selected or not}

    static instanceGetter() {
        if (KruskalController.#instance == null) {
            KruskalController.#canConstruct = true;
            KruskalController.#instance = new KruskalController();
            KruskalController.#canConstruct = false;
        }

        return KruskalController.#instance;
    }

    constructor() {
        super();

        if (!KruskalController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    //implement IManipulatorHelper

    init() {
        KruskalController.#g = new Graph();
        this.initializeEdge2Number();
        this.#initializeColorTable();
        //set the default order from top to bottom
        //fromTopToBottom = false;
        //generate the default order randomly: from top to bottom or bottom to top
        /*fromTopToBottom = Boolean(Utils.rnd(0, 1));
        direction = true;*/

    }

    firstStepGetter() {
        return new SortStep();
    }

    idGetter() {
        return KruskalController.ID;
    }

    regimeChanged(regime){
        //ManipulatorManager.instance.currentStep.update();
    }

    //instance methods
    graphGetter() {
        return KruskalController.#g;
    }

    initializeEdge2Number() {
        this.#edge2number = new Map();

        let randomEdgesMix = KruskalController.#g.edgesGetter().slice();

        for (let i = 1; i < randomEdgesMix.length; i++) {
            let j = Utils.rnd(0, i);
            let t = randomEdgesMix[i];
            randomEdgesMix[i] = randomEdgesMix[j];
            randomEdgesMix[j] = t;
        }

        let i = 0;
        for (let e of randomEdgesMix) {
            this.#edge2number.set(e, i++);
        }
    }

    #initializeColorTable() {
        this.#colorTable = [];
        let zeroDict = new Map();
        let i = 0;
        for (let v of KruskalController.#g.verticesGetter()) {
            zeroDict.set(v, i++);
        }

        this.#colorTable[0] = zeroDict;
    }

    getVertexColorFromTable(vertex) {
        return this.#colorTable[this.#colorTable.length - 1].get(vertex);
    }

    countVertexColor(color) {
        let result = 0;
        let d = this.#colorTable[this.#colorTable.length - 1];
        for (let c of d.values()) {
            if (c === color) {
                result++;
            }
        }
        return result;
    }

    /*
     * create a new line of colors in table. New line is calculated using
     * existing line with index step and has index step + 1
     */
    recolorVerticesAndUpdateColorTable(edge) {
        let d = new Map();

        let c1 = this.getVertexColorFromTable(edge.v1);
        let c2 = this.getVertexColorFromTable(edge.v2);
        if (this.countVertexColor(c1) > this.countVertexColor(c2)) {
            c1 = c1 + c2;
            c2 = c1 - c2;
            c1 = c1 - c2;
        }

        for (let v of KruskalController.#g.verticesGetter()) {
            d.set(v, this.#colorTable[this.#colorTable.length - 1].get(v) === c1 ?
                c2 : this.#colorTable[this.#colorTable.length - 1].get(v));
        }

        this.#colorTable.push(d);
    }

    PopUpFromColorTable() {
        this.#colorTable.pop();
    }

    getEdgePosition(e) {
        return this.#edge2number.get(e);
    }

    getEdgeByPosition(pos) {
        for (let e of KruskalController.#g.edgesGetter()) {
            if (this.#edge2number.get(e) === pos) {
                return e;
            }
        }
        return null;
    }

    exchangeTwoEdges(e1, e2) {
        let tmp = this.#edge2number.get(e1);
        this.#edge2number.set(e1, this.#edge2number.get(e2));
        this.#edge2number.set(e2, tmp);
    }

    moveEdgeToPosition(e, pos) {
        let oldPos = this.#edge2number.get(e);
        if (pos === oldPos) {
            return;
        }

        //e1 - 1             e1 - 1
        //e2 - 2             e3 - 2
        //e3 - 3   (e2 -> 4) e4 - 3
        //e4 - 4             e2 - 4
        //e5 - 5             e5 - 5

        for (let ee of KruskalController.#g.edgesGetter()) {
            let eepos = this.#edge2number.get(ee);
            if (oldPos < pos && eepos > oldPos && eepos <= pos) {
                this.#edge2number.set(ee, eepos - 1);
            } else if (oldPos > pos && eepos < oldPos && eepos >= pos) {
                this.#edge2number.set(ee, eepos + 1);
            }
        }

        this.#edge2number.set(e, pos);
    }

    isAscending() {
        for (let i = 1; i < KruskalController.#g.edgesGetter().length; i++) {
            if (this.getEdgeByPosition(i).lengthGetter() < this.getEdgeByPosition(i - 1).lengthGetter()) {
                return false;
            }
        }
        return true;
    }

    isDescending() {
        for (let i = 1; i < KruskalController.#g.edgesGetter().length; i++) {
            if (this.getEdgeByPosition(i).lengthGetter() > this.getEdgeByPosition(i - 1).lengthGetter()) {
                return false;
            }
        }
        return true;
    }

    reverseEdge2Number() {
        for (let e of KruskalController.#g.edgesGetter()) {
            this.#edge2number.set(e, KruskalController.#g.edgesGetter().length - 1 - this.#edge2number.get(e));
        }
    }

    // trace functions
    traceEdge2Number() {
        let delimiter = "------------------------------------";
        console.log(delimiter);
        for (let i = 0; i < KruskalController.#g.edgesGetter().length; i++) {
            console.log("edge2number[" + this.getEdgeByPosition(i).lengthGetter() + "] = " + i);
        }
        console.log(delimiter);
    }

    traceColorTable() {
        let delimiter = "------------------------------------";
        console.log(delimiter);
        let i = 0;
        for (; i < this.#colorTable.length; i++) {
            let str = "";
            for (let j of this.#colorTable[i]) {
                let space = (j < 10) ? " " : "";
                str += space + j + " | ";
            }
            console.log(str);
        }
        console.log("Total rows = " + i);
        console.log(delimiter);
    }


    /*get fromTopToBottom():Boolean {
        return _fromTopToBottom;
    }

    set fromTopToBottom(value:Boolean):void {
        _fromTopToBottom = value;
    }

    get direction():Boolean
    {
        return _direction;
    }

    set direction(value:Boolean):void
    {
        _direction = value;
    }
    */
    redrawInFinalGetter() {
        return false;
    }

    redraw(_workspace) {
    }

    needKeyboard() {
        return false;
    }

}