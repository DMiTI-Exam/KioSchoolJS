export class IPoint {
    constructor() {
        if (this.constructor === IPoint) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    pxGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    pyGetter() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}