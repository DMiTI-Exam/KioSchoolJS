export class Horse extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap("horse/_resource/s_horse.png"));
    }
}