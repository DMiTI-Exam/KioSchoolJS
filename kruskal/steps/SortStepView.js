import { Globals } from "../utils/Global.js";
import { DrawingGlobals } from "../model/DrawingGlobals.js";
import { IStepView } from "../../kioschool/view/IStepView.js";
import { KruskalController } from "../controller/KruskalController.js";

export class SortStepView extends IStepView {
    draw(workspace) {
        let g = KruskalController.instanceGetter().graphGetter();
        let gv = DrawingGlobals.getGraphView(g);//new GraphView(g);

        gv.x = Globals.GRAPH_VIEW_X;
        gv.y = Globals.GRAPH_VIEW_Y;

        let shape = new createjs.Shape();
        shape.graphics.lineTo(0, 0);
        shape.graphics.lineTo(100, 100);
        shape.setBounds(0, 0, 0, 0);
        workspace.addChild(shape);
        workspace.addChild(gv);

        gv.rigthEdgesMovableSetter(true);
        gv.righEdgeSelectionBoxSetter(false);
    }
}
