import { IManipulatorHelper } from '../../kioschool/controller/IManipulatorHelper.js'
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { FinalStep } from "../steps/FinalStep.js";
import { GraphConstructor } from "../utils/GraphConstructor.js";
import { DrawGraphStep } from "../steps/DrawGraphStep.js";

export class MatchingController extends IManipulatorHelper {
    static #instance;

    static #canConstruct = false;

    /**
     * Граф
     */
    #graph;

    static instanceGetter() {
        if (MatchingController.#instance == null) {
            MatchingController.#canConstruct = true;
            MatchingController.#instance = new MatchingController();
            MatchingController.#canConstruct = false;
        }

        return this.#instance;
    }

    constructor() {
        super();

        if (!MatchingController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    regimeChanged(regime) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof FinalStep) {
            ManipulatorManager.instanceGetter().currentStepGetter().update();
        }
    }

    init() {
        this.#graph = GraphConstructor.generateGraph();
    }

    firstStepGetter() {
        return new DrawGraphStep();
    }

    /**
     * Получает граф
     */
    graphGetter() {
        return this.#graph;
    }

    idGetter() {
        return "matching";
    }

    redrawInFinalGetter() {
        return false;
    }

    redraw(workspace) {

    }

    needKeyboard() {
        return false;
    }
}