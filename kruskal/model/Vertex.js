import { Globals } from "../utils/Global.js";

export class Vertex extends createjs.EventDispatcher {
    static COLOR_CHANGED = "vertex color is changed";

    #x;
    #y;
    #color;

    constructor(ray, radius) {
        super();
        let fi = (2 * Math.PI / Globals.RAYS_COUNT) * ray;
        this.#x = Math.round(Globals.GRAPH_CENTER_X + Math.cos(fi) * radius * Globals.SCALE_COEF);
        this.#y = Math.round(Globals.GRAPH_CENTER_Y + Math.sin(fi) * radius * Globals.SCALE_COEF);
        this.#color = -1;
    }

    xGetter() {
        return this.#x;
    }

    yGetter() {
        return this.#y;
    }

    colorGetter() {
        return this.#color;
    }

    colorSetter(col) {
        this.#color = col;
        this.dispatchEvent(new createjs.Event(Vertex.COLOR_CHANGED, false, false));
    }
}