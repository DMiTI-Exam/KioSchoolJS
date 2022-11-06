/**
 * Клетка шахматной доски
 */
export class ChessCell {
    /**
     * Признак того, что клетка уже пройдена
     */
    #traversed;

    /**
     * Признак выделенности клетки
     */
    #selected;

    /**
     * Объект отображения
     */
    #view;

    #rowNumber;
    #columnNumber;
    #leftCell;
    #rightCell;
    #upCell;
    #downCell;
    #weight = -1;

    constructor(rowNumber, columnNumber) {
        this.traversedSetter(false);
        this.selectedSetter(false);
        this.#rowNumber = rowNumber;
        this.#columnNumber = columnNumber;
    }

    weightGetter() {
        return this.#weight;
    }

    weightSetter(value) {
        this.#weight = value;
        this.updateView();
    }

    downCellGetter() {
        return this.#downCell;
    }

    downCellSetter(value) {
        this.#downCell = value;
    }

    upCellGetter() {
        return this.#upCell;
    }

    upCellSetter(value) {
        this.#upCell = value;
    }

    rightCellGetter() {
        return this.#rightCell;
    }

    rightCellSetter(value) {
        this.#rightCell = value;
    }

    leftCellGetter() {
        return this.#leftCell;
    }

    leftCellSetter(value) {
        this.#leftCell = value;
    }

    columnNumberGetter() {
        return this.#columnNumber;
    }

    columnNumberSetter(value) {
        this.#columnNumber = value;
    }

    rowNumberGetter() {
        return this.#rowNumber;
    }

    rowNumberSetter(value) {
        this.#rowNumber = value;
    }

    isOdd() {
        return (this.rowNumberGetter() % 2 === 0 && this.columnNumberGetter() % 2 === 0) ||
            (this.rowNumberGetter() % 2 === 1 && this.columnNumberGetter() % 2 === 1);
    }

    traversedGetter() {
        return this.#traversed;
    }

    traversedSetter(value) {
        this.#traversed = value;
        this.updateView();
    }

    selectedGetter() {
        return this.#selected;
    }

    selectedSetter(value) {
        this.#selected = value;
        this.updateView();
    }

    viewGetter() {
        return this.#view;
    }

    viewSetter(value) {
        this.#view = value;
    }

    updateView() {
        if(this.viewGetter() != null) {
            this.viewGetter().update();
        }
    }
}