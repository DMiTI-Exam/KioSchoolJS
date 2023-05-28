export class Page2 extends createjs.Container {
  constructor() {
    super();

    let page2 = new createjs.Bitmap("prim/_resource/page2.png");
    page2.x = 30;
    page2.y = 10;

    this.addChild(page2);
  }
}


