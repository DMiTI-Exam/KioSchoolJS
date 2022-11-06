import { View } from "../../kioschool/basic/view/View.js";

/**
 * Представление шахматной доски
 */
export class ChessBoardView extends View {
    #graphics;

    constructor() {
        super();

        this.#graphics = new createjs.Graphics();
        let shape = new createjs.Shape(this.#graphics);
        this.addChild(shape);
    }

    update() {
        this.#graphics.lineTo(580, 500);
    }

    getGraphics() {
        return this.#graphics;
    }
}