import { IStepView } from "../../kioschool/view/IStepView.js";
import { HorseController } from "../controller/HorseController.js";

/**
 * Представление шага выделения возможных ходов
 */
export class SelectNextCellsStepView extends IStepView {
    draw(workspace) {
        workspace.addChild(HorseController.instanceGetter().boardGetter().viewGetter());
    }
}