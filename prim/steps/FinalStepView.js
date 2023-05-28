import { IStepView } from "../../kioschool/view/IStepView.js";
import { PrimController } from "../controller/PrimController.js";

export class FinalStepView extends IStepView {
    constructor() {
        super();
    }

    draw(workspace) {
        workspace.addChild(PrimController.instanceGetter().graphGetter().viewGetter());
    }
}