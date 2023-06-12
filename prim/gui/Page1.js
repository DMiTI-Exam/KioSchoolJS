import { Main } from "../../Main.js";

export class Page1 extends createjs.Container {
    constructor() {
        super();

        let page1 = new createjs.Bitmap(Main.loader.getResult("58"));
        page1.x = 30;
        page1.y = 10;

        this.addChild(page1);
    }
}

