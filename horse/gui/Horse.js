import { Main } from "../../Main.js";

export class Horse extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap(Main.loader.getResult("38")));
    }
}