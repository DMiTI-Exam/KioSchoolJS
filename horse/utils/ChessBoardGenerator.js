import { ChessBoard } from "../model/ChessBoard.js";
import { ChessBoardView } from "../view/ChessBoardView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { ChessCell } from "../model/ChessCell.js";
import { ChessCellView } from "../view/ChessCellView.js";

/**
 * Класс утилит позволяет установить связи в графе на основе расположения
 * представлений элементов графа
 */
export class ChessBoardGenerator {
    static generateChessBoard() {
        let board = new ChessBoard();
        let boardView = new ChessBoardView();
         boardView.update();
         board.viewSetter(boardView);

         let amountOfRows = 6;
         let amountOfColumns = 6;

         let width = ManipulatorManager.instanceGetter().perspectiveGetter().getWorkspaceWidth();
         let height = ManipulatorManager.instanceGetter().perspectiveGetter().getWorkspaceHeight();

         let cellWidth = 76;
         let cellHeight = 76;
         let cellSize = Math.min(cellWidth, cellHeight);
         let shiftX = (width - 8 - cellSize * amountOfColumns) / 2;
         let shiftY = (height - 8 - cellSize * amountOfRows);

         for (let i = 0; i < amountOfRows; i++) {
             for (let j = 0; j < amountOfColumns; j++) {
                 let cell = new ChessCell(i, j);
                 board.addCell(cell);
                 let cellView = new ChessCellView(cellSize, cellSize);
                 cellView.cellSetter(cell);
                 cell.viewSetter(cellView);
                 cellView.x = j * cellSize + shiftX;
                 cellView.y = i * cellSize + shiftY;
                 boardView.addChild(cellView);
                 cellView.update();
             }
         }

         board.initRelationshipByNumber();
         let graphics = boardView.getGraphics();
         graphics.beginFill("#D7D7D9");
         graphics.drawRect(shiftX - 4, shiftY - 4, amountOfRows * cellSize + 8, amountOfRows * cellSize + 8);
         graphics.endFill();

         return board;
    }
}