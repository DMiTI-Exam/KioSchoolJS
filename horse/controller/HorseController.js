import { ChessBoardGenerator } from "../utils/ChessBoardGenerator.js";
import { SelectNextCellsStep } from "../steps/SelectNextCellsStep.js";
import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { TextField } from "../../additionalComponents/TextField.js";

/**
 * Контроллер манипулятора
 */
export class HorseController extends IManipulatorHelper {
    static ID = "horse";

    /**
     * Сингельтон
     */
    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    /**
     * Шахматная доска
     */
    #board;

    /**
     * Получает экземпляр
     */
    static instanceGetter() {
        if (HorseController.#instance == null) {
            HorseController.#canConstruct = true;
            HorseController.#instance = new HorseController();
            HorseController.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        super();

        if (!HorseController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    idGetter() {
        return HorseController.ID;
    }

    init() {
        TextField.removeInputsByName("horse");

        this.#board = ChessBoardGenerator.generateChessBoard();
        let cell = this.#board.listOfCellsGetter()
            [Math.floor(Math.random() * this.#board.listOfCellsGetter().length)];
        cell.traversedSetter(true);
        this.#board.activeCellSetter(cell);
    }

    firstStepGetter() {
        return new SelectNextCellsStep();
    }

    /**
     * Получает шахматную доску
     */
    boardGetter() {
        return this.#board;
    }

    /**
     * Сравнивает два массива ребер на равенство
     */
    equal(firstArray, secondArray) {
        if (firstArray.length !== secondArray.length) {
            return false;
        }

        let equal = true;
        for (let cell of firstArray) {
            if (secondArray.indexOf(cell) === -1) {
                equal = false;
            }
        }

        return equal;
    }

    regimeChanged(regime) {
        ManipulatorManager.instanceGetter().currentStepGetter().update();
    }

    updateViews() {
        for (let cell of this.#board.listOfCellsGetter()) {
            cell.updateView();
        }
    }

    redrawInFinalGetter() {
        return false;
    }

    redraw(workspace) {
    }

    needKeyboard() {
        return true;
    }
}