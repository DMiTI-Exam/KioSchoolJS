import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { SortStepView } from "./SortStepView.js";
import { SelectNonCycleEdgeStep } from "./SelectNonCycleEdgeStep.js";
import { KruskalController } from "../controller/KruskalController.js";
import { Edge } from "../model/Edge.js";

export class SortStep extends AbstractStep {
    /* CLASS kioschool.model.AbstractStep */

    getView() {
        return new SortStepView();
    }

    next() {
        return new SelectNonCycleEdgeStep();
    }

    checkInput(textConsumer=null) {
        /*if (KruskalController.instance.isDescending()) {
            KruskalController.instance.reverseEdge2Number();
            KruskalController.instance.direction = false;
        }
        */
        if (!KruskalController.instanceGetter().isAscending()) {
            CommentManager.instanceGetter().getHelp("kruskal_sort_error", textConsumer,
                "Ребра не упорядочены по длине сверху вниз");
            return " ";
        }

        return null;
    }

    oracle() {
        for (let i = 0; i < KruskalController.instanceGetter().graphGetter().edgesGetter().length; i++)
            for (let j = i + 1; j < KruskalController.instanceGetter().graphGetter().edgesGetter().length; j++) {
                let ei = KruskalController.instanceGetter().getEdgeByPosition(i);
                let ej = KruskalController.instanceGetter().getEdgeByPosition(j);
                //if ((ei.length > ej.length && KruskalController.instance.fromTopToBottom) || (ei.length < ej.length && !KruskalController.instance.fromTopToBottom))
                if (ei.lengthGetter() > ej.lengthGetter())
                    KruskalController.instanceGetter().exchangeTwoEdges(ei, ej);
            }
            //KruskalController.instance.direction = KruskalController.instance.fromTopToBottom;
    }

    restore() {
        // no need because no way back
    }

    antiOracle() {
        //randomize the edge order
        KruskalController.instanceGetter().initializeEdge2Number();
        //KruskalController.instance.direction = true;

        //mark all vertices as black (-1)
        for (let v of KruskalController.instanceGetter().graphGetter().verticesGetter()) {
            v.colorSetter(-1);
        }

        //mark all edges as non selected - actually just to repaint all edges
        for (let e of KruskalController.instanceGetter().graphGetter().edgesGetter()) {
            e.selectedSetter(Edge.SEL_UNKNOWN);
        }

        if (KruskalController.instanceGetter().graphGetter().isLastEdgeExistsGetter()) {
            KruskalController.instanceGetter().graphGetter().lastEdgeGetter().lastSetter(Edge.LAST_FALSE);
        }
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("kruskal_sort", textConsumer,
            "На этом шаге необходимо упорядочить ребра по длине сверху вниз");
    }

    codeGetter() {
        return "kruskal_sort";
    }

    update() {

    }
}