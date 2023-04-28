import { IStepView } from "../../kioschool/view/IStepView.js";
import { MatchingController } from "../controller/MatchingController.js";

export class HexogenView extends IStepView {
    draw(workspace) {
        let sp = new createjs.Shape();
        workspace.addChild(sp);
        sp.setBounds(0, 0, 0, 0);
        sp.graphics.lineTo(600, 600);
        MatchingController.instanceGetter().graphGetter().viewGetter().x = 150;
        MatchingController.instanceGetter().graphGetter().viewGetter().y = 60;
        MatchingController.instanceGetter().graphGetter().viewGetter().scaleX = 1;
        MatchingController.instanceGetter().graphGetter().viewGetter().scaleY = 1;
        workspace.addChild(MatchingController.instanceGetter().graphGetter().viewGetter());
    }
}