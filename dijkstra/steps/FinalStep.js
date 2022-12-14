import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { FinalStepView } from "./FinalStepView.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { DijkstraController } from "../controller/DijkstraController.js";

/**
 * Последний шаг
 */
export class FinalStep extends AbstractStep {
    getView() {
        return new FinalStepView();
    }

    next() {
        return null;
    }

    checkInput(textConsumer = null) {
        return null;
    }

    oracle() {
        // do nothing
    }

    antiOracle() {
        //do nothing
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("dijkstra_final", textConsumer,
            "Все кратчайшие пути найдены");
    }

    codeGetter() {
        return "dijkstra_final";
    }

    update() {
        DijkstraController.instanceGetter().updateInput();
    }
}