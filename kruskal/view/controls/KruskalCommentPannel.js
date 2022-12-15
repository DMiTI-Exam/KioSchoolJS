import { DefaultCommentPanel } from "../../../kioschool/view/controlsImpl/comment/DefaultCommentPanel.js";
import { KruskalComment } from "../../gui/KruskalComment.js";
import { KruskalErrorComment } from "../../gui/KruskalErrorComment.js";

export class KruskalCommentPanel extends DefaultCommentPanel {
    constructor(hero, cloudX, cloudY, evilHero=null) {
        let comment = new KruskalComment();
        let errorComment = new KruskalErrorComment();
        super(hero, cloudX, cloudY, evilHero, comment, errorComment, comment.comment_txt, errorComment.comment_txt);
    }
}