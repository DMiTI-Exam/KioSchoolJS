import { Main } from "../../Main.js";

export class Page3 extends createjs.Container {
    constructor() {
        super();

        let page3 = new createjs.Bitmap(Main.loader.getResult("37"));
        page3.x = 40;
        page3.y = 10;
        this.addChild(page3);
    }
}