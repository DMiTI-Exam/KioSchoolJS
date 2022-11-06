/**
 *  Шахматная доска
 */
export class ChessBoard {
    #activeCell;
    #view;
    #listOfCells = [];

    constructor() {
    }

    activeCellGetter() {
        return this.#activeCell;
    }

    activeCellSetter(value) {
        this.#activeCell = value;

        for (let cell of this.listOfCellsGetter()) {
            cell.updateView();
        }
    }

    listOfCellsGetter() {
        return this.#listOfCells;
    }

    listOfSelectedCellsGetter() {
        let list = [];
        for (let cell of this.#listOfCells) {
            if (cell.selectedGetter()) {
                list.push(cell);
            }
        }

        return list;
    }

    listOfTraversedCellsGetter() {
        let list = [];
        for (let cell of this.#listOfCells) {
            if (cell.traversedGetter()) {
                list.push(cell);
            }
        }

        return list;
    }

    addCell(cell) {
        this.#listOfCells.push(cell);
    }

    getCell(row, column) {
        for (let cell of this.#listOfCells) {
            if (cell.rowNumberGetter() === row && cell.columnNumberGetter() === column) {
                return cell;
            }
        }

        return null;
    }

    initRelationshipByNumber() {
        for (let cell of this.#listOfCells) {
            cell.rightCellSetter(this.getCell(cell.rowNumberGetter(), cell.columnNumberGetter()+1));
            cell.leftCellSetter(this.getCell(cell.rowNumberGetter(), cell.columnNumberGetter()-1));
            cell.downCellSetter(this.getCell(cell.rowNumberGetter()+1, cell.columnNumberGetter()));
            cell.upCellSetter(this.getCell(cell.rowNumberGetter()-1, cell.columnNumberGetter()));
        }
    }

    getNextStepsCount(cell) {
        let c = cell.columnNumberGetter();
        let r = cell.rowNumberGetter();
        let array = [];
        this.addIfNecessary(this.getCell(r-1, c+2), array);
        this.addIfNecessary(this.getCell(r-1, c-2), array);
        this.addIfNecessary(this.getCell(r-2, c+1), array);
        this.addIfNecessary(this.getCell(r-2, c-1), array);
        this.addIfNecessary(this.getCell(r+1, c+2), array);
        this.addIfNecessary(this.getCell(r+1, c-2), array);
        this.addIfNecessary(this.getCell(r+2, c+1), array);
        this.addIfNecessary(this.getCell(r+2, c-1), array);

        return array.length;
    }

    getNextSteps() {
        let c = this.#activeCell.columnNumberGetter();
        let r = this.#activeCell.rowNumberGetter();
        let array = [];

        this.addIfNecessary(this.getCell(r-1, c+2), array);
        this.addIfNecessary(this.getCell(r-1, c-2), array);
        this.addIfNecessary(this.getCell(r-2, c+1), array);
        this.addIfNecessary(this.getCell(r-2, c-1), array);
        this.addIfNecessary(this.getCell(r+1, c+2), array);
        this.addIfNecessary(this.getCell(r+1, c-2), array);
        this.addIfNecessary(this.getCell(r+2, c+1), array);
        this.addIfNecessary(this.getCell(r+2, c-1), array);
        return array;
    }

    addIfNecessary(cell, array) {
        if (cell != null && !cell.traversedGetter())
            array.push(cell);
    }

    viewGetter() {
        return this.#view;
    }

    viewSetter(value) {
        this.#view = value;
    }
}