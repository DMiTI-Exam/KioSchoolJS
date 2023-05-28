import { IStepView } from "../../kioschool/view/IStepView.js";
import { PrimController } from "../controller/PrimController.js";

/**
 * Представления шага включения нового ребра в минимальное остовное дерево
 */
export class AddEdgeToTreeStepView extends IStepView {
    constructor() {
        super();
    }

    draw(workspace) {
        workspace.addChild(PrimController.instanceGetter().graphGetter().viewGetter());
    }
}