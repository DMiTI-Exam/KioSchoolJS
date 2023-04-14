import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { EulerController } from "../controller/EulerController.js";
import { GraphView } from "./GraphView.js";

/**
 * Последний шаг - необходимость текущей платформы
 */
export class FinalStep extends AbstractStep {
    #graph = EulerController.instanceGetter().graphGetter();

    getView() {
        return new GraphView(false);
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
        CommentManager.instanceGetter().getStepHelp("euler_final", textConsumer, "Граф пройден");
    }

    codeGetter() {
        return "euler_final";
    }

    update() {
        this.#graph.viewGetter().update();
    }
}