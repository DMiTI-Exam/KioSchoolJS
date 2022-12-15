import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { Edge } from "../model/Edge.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { DrawingGlobals } from "../model/DrawingGlobals.js";
import { KruskalController } from "../controller/KruskalController.js";
import { SelectNonCycleEdgeStepView } from "./SelectNonCycleEdgeStepView.js";
import { FinalStep } from "./FIinalStep.js";

export class SelectNonCycleEdgeStep extends AbstractStep
{
    #moveForward = true;

    /* CLASS kioschool.model.AbstractStep */

    getView() {
        return new SelectNonCycleEdgeStepView();
    }

    next() {
        if (KruskalController.instanceGetter().getEdgePosition(KruskalController.instanceGetter()
            .graphGetter().lastEdgeGetter()) === KruskalController.instanceGetter()
            .graphGetter().edgesGetter().length - 1) {
            this.#UpdateColorTable(KruskalController.instanceGetter().graphGetter().lastEdgeGetter());
            return new FinalStep();
        } else {
            return new SelectNonCycleEdgeStep();
        }
    }

    checkInput(textConsumer=null)
    {
        this.#moveForward = true;

        let e = KruskalController.instanceGetter().graphGetter().lastEdgeGetter();
        let ev1color = KruskalController.instanceGetter().getVertexColorFromTable(e.v1);
        let ev2color = KruskalController.instanceGetter().getVertexColorFromTable(e.v2);

        if (e.selectedGetter() === Edge.SEL_UNKNOWN) {
            CommentManager.instanceGetter().getHelp("kruskal_selectMinNonCycleEdgeStep_error1", textConsumer,
                "Необходимо либо включить ребро в остовное дерево, либо исключить из него");
            return " ";
        }

        if (e.selectedGetter() === Edge.SEL_TRUE && ev1color === ev2color) {
            CommentManager.instanceGetter().getHelp("kruskal_selectMinNonCycleEdgeStep_error2", textConsumer,
                "Ребро образует цикл значит его нужно исключить из остовного дерева");
            return " ";
        }

        if (e.selectedGetter() === Edge.SEL_FALSE && ev1color !== ev2color){
            CommentManager.instanceGetter().getHelp("kruskal_selectMinNonCycleEdgeStep_error3", textConsumer,
                "Ребро не образует цикл значит его нужно включить в остовное дерево");
            return " ";
        }

        return null;
    }

    oracle()
    {
        this.#moveForward = true;

        let e = KruskalController.instanceGetter().graphGetter().lastEdgeGetter();

        if (KruskalController.instanceGetter().getVertexColorFromTable(e.v1) !==
            KruskalController.instanceGetter().getVertexColorFromTable(e.v2)) {
            e.selectedSetter(Edge.SEL_TRUE);
        } else {
            e.selectedSetter(Edge.SEL_FALSE);
        }
    }

    antiOracle() {
        this.#moveForward = false;

        let curEdge;

        if (KruskalController.instanceGetter().graphGetter().isLastEdgeExistsGetter())
        {
            curEdge = KruskalController.instanceGetter().getEdgeByPosition(
                KruskalController.instanceGetter().getEdgePosition(
                    KruskalController.instanceGetter().graphGetter().lastEdgeGetter()) - 1);
        } else {
            curEdge = KruskalController.instanceGetter().getEdgeByPosition(
                KruskalController.instanceGetter().graphGetter().edgesGetter().length - 1);
        }

        if (curEdge.selectedGetter() === Edge.SEL_TRUE) {
            KruskalController.instanceGetter().PopUpFromColorTable();
        }

        curEdge.selectedSetter(Edge.SEL_UNKNOWN);
    }

    restore() {

        //moveForward = false;

        let curEdge = KruskalController.instanceGetter().graphGetter().lastEdgeGetter();

        curEdge.selectedSetter(Edge.SEL_UNKNOWN);
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("kruskal_selectMinNonCycleEdgeStep", textConsumer,
            "На этом шаге необходимо включить ребро в остовное дерево если оно не образует цикл или если его вершины имеют разные цвета. В противном случае следует исключить ребро из дерева");
    }

    update() {
        let curLastEdge;
        let nextLastEdgeIndex;

        if (KruskalController.instanceGetter().graphGetter().isLastEdgeExistsGetter()) {
            curLastEdge = KruskalController.instanceGetter().graphGetter().lastEdgeGetter();
            curLastEdge.lastSetter(Edge.LAST_FALSE);

            //when moving backward the curent last edge will be always SEL_UNKNOWN and this clause will be applied only when moving forward
            this.#UpdateColorTable(curLastEdge);

            //define the index of the next edge to be the last in case we already have some last edge depending on which way we move: forward or backward
            nextLastEdgeIndex = (this.#moveForward) ? KruskalController.instanceGetter()
                .getEdgePosition(curLastEdge) + 1 : KruskalController.instanceGetter().getEdgePosition(curLastEdge) - 1;
        } else {
            //define the index of the next edge to be the last in case we don't have any last edge depending on which way we move: forward or backward
            nextLastEdgeIndex = (this.#moveForward) ? 0 : KruskalController.instanceGetter().graphGetter()
                .edgesGetter().length - 1;
        }

        //set the new edge as last if it is possible
        if (nextLastEdgeIndex < KruskalController.instanceGetter().graphGetter().edgesGetter().length &&
            nextLastEdgeIndex >= 0) {
            KruskalController.instanceGetter().getEdgeByPosition(nextLastEdgeIndex).lastSetter(Edge.LAST_TRUE);
        }

        //KruskalController.instance.traceColorTable();
        //trace("[" + KruskalController.instance.getEdgePosition(KruskalController.instance.graph.lastEdge) + "] - " + KruskalController.instance.getEdgeByPosition(KruskalController.instance.getEdgePosition(KruskalController.instance.graph.lastEdge)).length);

        //set color for all vertices
        for (let v of KruskalController.instanceGetter().graphGetter().verticesGetter()) {
            v.colorSetter(KruskalController.instanceGetter().getVertexColorFromTable(v));
        }

        let gv = DrawingGlobals.getGraphView(KruskalController.instanceGetter().graphGetter());
        for (let e of KruskalController.instanceGetter().graphGetter().edgesGetter()) {
            gv.getViewByEdge(e).repaint();
        }
    }

    #UpdateColorTable(curLastEdge) {
        if (curLastEdge.selectedGetter() === Edge.SEL_TRUE) {
            KruskalController.instanceGetter().recolorVerticesAndUpdateColorTable(curLastEdge);
        }
    }

    codeGetter(){
        return "kruskal_selectMinNonCycleEdgeStep";
    }
}