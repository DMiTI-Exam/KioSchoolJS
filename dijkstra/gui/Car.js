export class Car extends createjs.Container {
    constructor() {
        super();

        this.addChild(new createjs.Bitmap("dijkstra/_resource/car.png"));
    }
}