import { IStepView } from "../../kioschool/view/IStepView.js";
import { MatchingController } from "../controller/MatchingController.js";

export class HexogenAndChainView extends IStepView {
    draw(workspace) {
        let sp = new createjs.Shape();
        workspace.addChild(sp);
        sp.setBounds(0, 0, 0, 0);
        sp.graphics.lineTo(600, 600);

        MatchingController.instanceGetter().graphGetter().chainViewGetter().y = 30;
        MatchingController.instanceGetter().graphGetter().chainViewGetter().scaleX = 1.2;
        MatchingController.instanceGetter().graphGetter().chainViewGetter().scaleY = 1.2;
        workspace.addChild(MatchingController.instanceGetter().graphGetter().chainViewGetter());

        MatchingController.instanceGetter().graphGetter().viewGetter().x = 410;
        MatchingController.instanceGetter().graphGetter().viewGetter().y = 90;
        MatchingController.instanceGetter().graphGetter().viewGetter().scaleX = 0.8;
        MatchingController.instanceGetter().graphGetter().viewGetter().scaleY = 0.8;
        workspace.addChild(MatchingController.instanceGetter().graphGetter().viewGetter());
    }
}