/**
 * This class is non needed
 */
export class EventEdge extends createjs.Event {
    #edge;
		
    constructor(edge, type, bubbles = false, cancelable = false) {
        super(type, bubbles, cancelable);
        this.#edge = edge;
    }
    
    edgeGetter() {
        return this.#edge;
    }
}