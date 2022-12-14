import { IStepView } from "../../kioschool/view/IStepView.js";
import { DijkstraController } from "../controller/DijkstraController.js";

export class CommonStepView extends IStepView {
    constructor() {
        super();
    }

    draw(workspace) {
        let view = DijkstraController.instanceGetter().graphGetter().viewGetter();
        workspace.addChild(view);

        let table = DijkstraController.instanceGetter().tableViewGetter();
        table.y = 550;
        table.x = 20;
        workspace.addChild(table);
    }
}