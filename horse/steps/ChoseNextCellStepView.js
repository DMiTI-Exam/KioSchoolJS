import { IStepView } from "../../kioschool/view/IStepView.js";
import { HorseController } from "../controller/HorseController.js";

/**
 * Представления шага включения нового ребра в минимальное остовное дерево
 */
export class ChoseNextCellStepView extends IStepView {
    constructor() {
        super();
    }

    draw(workspace) {
        workspace.addChild(HorseController.instanceGetter().boardGetter().viewGetter());
    }
}