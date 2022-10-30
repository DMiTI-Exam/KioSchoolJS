export class A extends createjs.Shape {
    fieldA = "field A";

    constructor() {
        super();

        this.graphics.beginFill("#7F2834").drawRect(0, 50, 100, 100);
        this.x = 0;
        this.y = 50;
    }
}