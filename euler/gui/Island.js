export class Island extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap("euler/_resource/island.png"));
    }
}