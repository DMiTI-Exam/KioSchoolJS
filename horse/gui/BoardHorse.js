import { Main } from "../../Main.js";

export class BoardHorse extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap(Main.loader.getResult("34")));
    }
}