export class BoardHorse extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap("horse/_resource/board_horse.png"));
    }
}