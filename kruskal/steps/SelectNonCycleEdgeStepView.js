import { DrawingGlobals } from "../model/DrawingGlobals.js";
import { Globals } from "../utils/Global.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { IStepView } from "../../kioschool/view/IStepView.js";
import { KruskalController } from "../controller/KruskalController.js";

export class SelectNonCycleEdgeStepView extends IStepView
{

    /* INTERFACE kioschool.IStepView */

    draw(workspace) {
        let g = KruskalController.instanceGetter().graphGetter();
        let gv = DrawingGlobals.getGraphView(g);

        gv.x = Globals.GRAPH_VIEW_X;
        gv.y = Globals.GRAPH_VIEW_Y;

        workspace.addChild(gv);

        gv.rigthEdgesMovableSetter(false);
        gv.righEdgeSelectionBoxSetter(ManipulatorManager.instanceGetter().regimeGetter() !==
            ManipulatorManager.REGIME_DEMO);
    }
}