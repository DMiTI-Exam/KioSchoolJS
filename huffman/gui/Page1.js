export class Page1 extends createjs.Container {
    constructor() {
        super();

        let page1 = new createjs.Bitmap("huffman/_resources/page1.png");
        page1.x = 40;
        page1.y = 10;
        this.addChild(page1);
    }
}