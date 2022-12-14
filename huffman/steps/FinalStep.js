import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { EncodedTreeView } from "../view/EncodedTreeView.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";

/**
 * Последний шаг - необходимость текущей платформы
 */
export class FinalStep extends AbstractStep {
    getView() {
        return new EncodedTreeView();
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
        CommentManager.instanceGetter().getStepHelp("huffman_final", textConsumer,
            "Строка декодирована");
    }

    codeGetter() {
        return "huffman_final";
    }

    update() {
    }
}