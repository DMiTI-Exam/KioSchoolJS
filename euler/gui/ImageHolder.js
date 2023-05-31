import { Main } from "../../Main.js";

export class ImageHolder {
    nStep = new createjs.Bitmap(Main.loader.getResult("30"));
    nStep1 = new createjs.Bitmap(Main.loader.getResult("31"));
    nStep2 = new createjs.Bitmap(Main.loader.getResult("32"));

    constructor() {

    }

    getNStep() {
        return this.nStep;
    }

    getNStep1() {
        return this.nStep1;
    }

    getNStep2() {
        return this.nStep2;
    }
}