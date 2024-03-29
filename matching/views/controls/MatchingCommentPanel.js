import { DefaultCommentPanel } from "../../../kioschool/view/controlsImpl/comment/DefaultCommentPanel.js";
import { MatchingComment } from "../../gui/MatchingComment.js";
import { MatchingErrorComment } from "../../gui/MatchingErrorComment.js";

export class MatchingCommentPanel extends DefaultCommentPanel {
    constructor(hero, cloudX, cloudY, evilHero = null) {
        let comment = new MatchingComment();
        let errorComment = new MatchingErrorComment();
        super(hero, cloudX, cloudY, evilHero, comment, errorComment, comment.comment_txt, errorComment.comment_txt);
    }
}