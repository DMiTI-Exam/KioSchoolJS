export class IPoint {
    constructor() {
        if (this.constructor === IPoint) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    getPx() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    getPy() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}