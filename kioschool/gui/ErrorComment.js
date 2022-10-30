export class ErrorComment extends createjs.Container {
    comment_txt;

    constructor() {
        super();

        this.comment_txt = new createjs.Text("", "14px Verdana", "#403e29");
        this.comment_txt.x = 11;
        this.comment_txt.y = 10;
        this.comment_txt.lineWidth = 189;

        this.addChild(new createjs.Bitmap("kioschool/_resource/error_comment.png"));
        this.addChild(this.comment_txt);
    }
}