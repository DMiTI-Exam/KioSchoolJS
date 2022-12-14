import { IStepView } from "../../kioschool/view/IStepView.js";
import { HorseController } from "../controller/HorseController.js";

export class FinalStepView extends IStepView {
    constructor() {
        super();
    }

    draw(workspace) {
        workspace.addChild(HorseController.instanceGetter().boardGetter().viewGetter());
    }
}