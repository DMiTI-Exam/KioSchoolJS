export class Page2 extends createjs.Container {
    constructor() {
        super();

        let page2 = new createjs.Bitmap('dijkstra/_resource/page2.png');
        page2.x = 30;
        page2.y = 30;

        this.addChild(page2);
    }
}