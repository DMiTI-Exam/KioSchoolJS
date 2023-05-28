import { IStepView } from "../../kioschool/view/IStepView.js";
import { PrimController } from "../controller/PrimController.js";

/**
 * Представление шага выделения граничных ребер
 */
export class SelectBoundaryEdgesStepView extends IStepView {
    draw(workspace) {
        workspace.addChild(PrimController.instanceGetter().graphGetter().viewGetter())
    }
}