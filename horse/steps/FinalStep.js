import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { FinalStepView } from "./FinalStepView.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";

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
        CommentManager.instanceGetter().getStepHelp("horse_final", textConsumer,
            "Обход завершен");
    }

    codeGetter() {
        return "horse_final";
    }

    update() {
    }
}