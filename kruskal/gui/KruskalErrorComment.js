import { Main } from "../../Main.js";

export class KruskalErrorComment extends createjs.Container {
    comment_txt;

    constructor() {
        super();

        this.comment_txt = new createjs.Text("", "14px Verdana", "#403e29");
        this.comment_txt.x = 11;
        this.comment_txt.y = 40;
        this.comment_txt.lineWidth = 230;

        this.addChild(new createjs.Bitmap(Main.loader.getResult("43")));
        this.addChild(this.comment_txt);
    }
}