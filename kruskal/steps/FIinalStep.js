import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { FinalStepView } from "./FinalStepView.js";
import { KruskalController } from "../controller/KruskalController.js";
import { Edge } from "../model/Edge.js";

export class FinalStep extends AbstractStep
{
    getView() {
        return new FinalStepView();
    }

    next() {
        return null;
    }

    checkInput(textConsumer=null) {
        return null;
    }

    oracle() {
    }

    antiOracle() {
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("kruskal_final", textConsumer,
            "Построение остовного дерева закончено");
    }

    codeGetter() {
        return "kruskal_final";
    }

    restore() {
    }

    update() {
        //set color for all vertices
        for (let v of KruskalController.instanceGetter().graphGetter().verticesGetter()) {
            v.colorSetter(KruskalController.instanceGetter().getVertexColorFromTable(v));
        }

        //remove last flag from all edges
        for (let e of KruskalController.instanceGetter().graphGetter().edgesGetter()) {
            e.lastSetter(Edge.LAST_FALSE);
        }
    }
}