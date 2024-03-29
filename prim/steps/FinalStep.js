import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { FinalStepView } from "./FinalStepView.js";

/**
 * Последний шаг - необходимость текущей платформы
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
    }

    antiOracle() {
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("prim_final", textConsumer,
            "Минимальное остовное дерево (МОД) построено");
    }

    codeGetter() {
        return "prim_final";
    }

    update() {
    }
}
