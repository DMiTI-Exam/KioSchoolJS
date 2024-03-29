import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { HexogenAndChainView } from "./HexogenAndChainView.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { MatchingController } from "../controller/MatchingController.js";

/**
 * Последний шаг - необходимость текущей платформы
 */
export class FinalStep extends AbstractStep {
    getView() {
        return new HexogenAndChainView();
    }

    next() {
        return null;
    }

    checkInput(textConsumer = null) {
        return null;
    }

    oracle() {

    }

    antiOracle() {

    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("matching_final", textConsumer,
            "Парасочетание построено");
    }

    codeGetter() {
        return "matching_final";
    }

    update() {
        MatchingController.instanceGetter().graphGetter().viewGetter().update();
        MatchingController.instanceGetter().graphGetter().chainViewGetter().update();
        MatchingController.instanceGetter().graphGetter().rebuildViews();
    }
}