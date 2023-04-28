export class Page3 extends createjs.Container {
    constructor() {
        super();

        let page3 = new createjs.Bitmap("matching/_resource/page3.png");
        page3.x = 30;
        page3.y = 10;

        this.addChild(page3);
    }
}