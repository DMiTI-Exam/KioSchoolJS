import { Globals } from "../utils/Global.js";

export class Edge extends createjs.EventDispatcher {
    static SEL_UNKNOWN = -1;
    static SEL_TRUE = 0;
    static SEL_FALSE = 1;
    
    static DISP_TRUE = 0;
    static DISP_FALSE = 1;
    
    static HL_TRUE = 0;
    static HL_FALSE = 1;
    
    static LAST_TRUE = 0;
    static LAST_FALSE = 1;
    
    static EDGE_MODIFIED = "edge modified";
    
    #selected = Edge.SEL_UNKNOWN;
    #display = Edge.DISP_TRUE;
    #highLighted = Edge.HL_FALSE;
    #last = Edge.LAST_FALSE;
    v1;
    v2;
    #length;

    constructor (v1, v2) {
        super();
        this.v1 = v1;
        this.v2 = v2;
        let dx = v1.xGetter() - v2.xGetter();
        let dy = v1.yGetter() - v2.yGetter();
        this.#length = Math.round(Math.sqrt(dx*dx + dy*dy) / Globals.SCALE_COEF);
    }

    selectedSetter(value) {
        this.#selected = value;
        this.dispatchEvent(new createjs.Event(Edge.EDGE_MODIFIED, false, false));
    }
    
    selectedGetter() {
        return this.#selected;
    }

    displaySetter(value) {
        this.#display = value;
        this.dispatchEvent(new createjs.Event(Edge.EDGE_MODIFIED, false, false));
    }
    
    displayGetter() {
        return this.#display;
    }

    highLightedSetter(value) {
        this.#highLighted = value;
        this.dispatchEvent(new createjs.Event(Edge.EDGE_MODIFIED, false, false));
    }
    
    highLightedGetter() {
        return this.#highLighted;
    }

    lastSetter(value) {
        this.#last = value;
        this.dispatchEvent(new createjs.Event(Edge.EDGE_MODIFIED, false, false));
    }
    
    lastGetter() {
        return this.#last;
    }
    
    lengthGetter() {
        return this.#length;
    }
}