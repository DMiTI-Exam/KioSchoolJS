import { Spider } from "./Spider.js";

export class Page2 extends createjs.Container {
    constructor() {
        super();

        let page2 = new createjs.Bitmap("kruskal/_resource/page2.png");
        page2.x = 20;
        page2.y = -10;
        this.addChild(page2);

        let spider = new Spider();
        spider.x = 330;
        spider.y = 10;
        spider.scaleX = -0.78;
        spider.scaleY = 0.78;
        this.addChild(spider);
    }
}