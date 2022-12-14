import { View } from "../../kioschool/basic/view/View.js";

export class IPointContainer extends View {
    constructor() {
        super();
        if (this.constructor === IPointContainer) {
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

