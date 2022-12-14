import { Spider } from "./Spider.js";

export class Page1 extends createjs.Container {
    constructor() {
        super();

        let page1 = new createjs.Bitmap("kruskal/_resource/page1.png");
        page1.x = 20;
        page1.y = 5;
        this.addChild(page1);

        let spider = new Spider();
        spider.x = 520;
        spider.y = 10;
        spider.scaleX = 0.78;
        spider.scaleY = 0.78;
        this.addChild(spider);
    }
}