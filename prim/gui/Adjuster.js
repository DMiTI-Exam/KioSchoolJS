import { Main } from "../../Main.js";

export class Adjuster extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap(Main.loader.getResult("56")));
    }
}