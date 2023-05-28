import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { SelectBoundaryEdgesStep } from "../steps/SelectBoundaryEdgesStep.js";
import { GraphConstructor } from "../utils/GraphConstructor.js";

/**
 * Контроллер манипулятора
 *
 */
export class PrimController extends IManipulatorHelper {
    static ID = "prim";

    /**
     * Сингельтон
     */
    static #instance;

    static #canConstruct = false;

    #graph;

    /**
     * Сингельтон
     */
    static instanceGetter() {
        if (PrimController.#instance == null) {
            PrimController.#canConstruct = true;
            PrimController.#instance = new PrimController();
            PrimController.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        super();

        if (!PrimController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    idGetter() {
        return PrimController.ID;
    }

    init() {
        this.#graph = GraphConstructor.parseGraph();
        this.graphGetter().vertexesGetter()[Math.floor(Math.random() * this.#graph.vertexesGetter().length)]
            .inTreeSetter(true);
    }

    regimeChanged(regime) {
    }

    firstStepGetter() {
        return new SelectBoundaryEdgesStep();
    }

    greetingGetter() {
        return "Постройте минимальное остовное дерево (МОД) как последовательность расширяющихся поддеревьев " +
            "при помощи алгоритма Прима.";
    }

    /**
     * Получает граф
     */
    graphGetter() {
        return this.#graph;
    }

    /**
     * Сравнивает два массива ребер на равенство
     */
    equal(firstArray, secondArray) {
        if(firstArray.length !== secondArray.length) {
            return false;
        }

        let equal = true;
        for (let edge of firstArray){
            if(secondArray.indexOf(edge) === -1) {
                equal = false;
            }
        }

        return equal;
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

