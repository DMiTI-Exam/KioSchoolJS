import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { AdjacentVertexSelectionStep } from "../steps/AdjacentVertexSelectionStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { AdjacentVertexCorrectionStep } from "../steps/AdjacentVertexCorrectionStep.js";
import { CityMap } from "../gui/CityMap.js";
import { TextField } from "../../additionalComponents/TextField.js";

export class DijkstraController extends IManipulatorHelper {
    static ID = "dijkstra";

    static #instance;

    static #canConstruct = false;

    #graph;
    #tableView;
    #lastInTreeVertex;

    static instanceGetter() {
        if (DijkstraController.#instance == null) {
            DijkstraController.#canConstruct = true;
            DijkstraController.#instance = new DijkstraController();
            DijkstraController.#canConstruct = false;
        }

        return this.#instance;
    }

    constructor() {
        super();

        if (!DijkstraController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    redrawInFinalGetter() {
        return false;
    }

    redraw(workspace) {
    }

    idGetter() {
        return DijkstraController.ID;
    }

    init() {
        TextField.removeInputsByName("dijkstra");

        this.#graph = new CityMap().createGraphAndRebuildMap();

        this.#tableView = new createjs.Container();
        let tableViewShape = new createjs.Shape();
        this.#tableView.addChild(tableViewShape);

        this.#graph.vertexesGetter().sort(function (a, b) {
            return (a.nameGetter() > b.nameGetter()) ? 1 : -1;
        });

        let shift = 140;

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            let v = this.#graph.vertexesGetter()[i];
            v.viewsGetter()[1].x = i * 33 + shift;
            this.#tableView.addChild(v.viewsGetter()[1]);
        }

        tableViewShape.graphics.setStrokeStyle(1)
        tableViewShape.graphics.beginStroke("rgba(170, 170, 170, 1)");
        tableViewShape.graphics.moveTo(661 - 1 + shift, 0);
        tableViewShape.graphics.lineTo(661 - 1 + shift, 60);

        tableViewShape.graphics.moveTo(0, 0);
        tableViewShape.graphics.lineTo(shift, 0);
        tableViewShape.graphics.moveTo(0, 20);
        tableViewShape.graphics.lineTo(shift, 20);
        tableViewShape.graphics.moveTo(0, 40);
        tableViewShape.graphics.lineTo(shift, 40);
        tableViewShape.graphics.moveTo(0, 60);
        tableViewShape.graphics.lineTo(shift, 60);
        tableViewShape.graphics.moveTo(0, 0);
        tableViewShape.graphics.lineTo(0, 60);

        tableViewShape.graphics.beginFill("#CCCCCC");
        tableViewShape.graphics.drawRect(shift, 20, 800 - 1 - shift, 20);
        tableViewShape.graphics.endFill();

        let tfName = new createjs.Text("Вершина", "14px Times New Roman");
        tfName.x = 0;
        tfName.y = 3;
        tfName.maxWidth = shift;
        tfName.lineHeight = 20;
        this.#tableView.addChild(tfName);

        let tfW = new createjs.Text("Вес до редактирования", "14px Times New Roman");
        tfW.x = 0
        tfW.y = 23;
        tfW.maxWidth = shift;
        tfW.lineHeight = 20;
        this.#tableView.addChild(tfW);

        let tfWC = new createjs.Text("Вес после редактирования", "14px Arial");
        tfWC.x = 0;
        tfWC.y = 43;
        tfWC.maxWidth = shift;
        tfWC.lineHeight = 20;
        this.#tableView.addChild(tfWC);

        //Выбор начальной вершины
        this.lastInTreeVertexSetter(this.#graph.vertexesGetter()[Math.floor(Math.random() *
            this.#graph.vertexesGetter().length)]);
        this.lastInTreeVertexGetter().inTreeSetter(true);
        this.lastInTreeVertexGetter().weightSetter(0);
    }

    firstStepGetter() {
        return new AdjacentVertexSelectionStep();
    }

    greetingGetter() {
        return "Найдите кратчайшие пути, используя алгоритм Дейкстры.";
    }

    graphSetter(value) {
        this.#graph = value;
    }

    graphGetter() {
        return this.#graph;
    }

    tableViewGetter() {
        return this.#tableView
    }

    lastInTreeVertexSetter(value) {
        this.#lastInTreeVertex = value;
    }

    lastInTreeVertexGetter() {
        return this.#lastInTreeVertex;
    }

    /**
     * Сравнивает два массива ребер на равенство
     */
    equal(firstArray, secondArray) {
        if (firstArray.length !== secondArray.length) {
            return false;
        }

        let equal = true;
        for (let vertex of firstArray) {
            if (secondArray.indexOf(vertex) === -1) {
                equal = false;
            }
        }

        return equal;
    }

    regimeChanged(regime) {
        ManipulatorManager.instanceGetter().currentStepGetter().update();
        this.updateInput();
    }

    updateInput() {
        if (this.graphGetter() == null) {
            return;
        }

        for (let vk of this.graphGetter().vertexesGetter()) {
            vk.updateViews();
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO &&
            ManipulatorManager.instanceGetter().currentStepGetter() instanceof AdjacentVertexCorrectionStep) {
            for (let i = 0; i < this.graphGetter().vertexesGetter().length; i++) {
                this.graphGetter().vertexesGetter()[i].viewsGetter()[0].setInput(true);
                this.graphGetter().vertexesGetter()[i].viewsGetter()[1].setInput(true);
            }
        } else {
            for (let v of this.graphGetter().vertexesGetter()) {
                v.viewsGetter()[0].setInput(false);
                v.viewsGetter()[1].setInput(false);
            }
        }
    }

    needKeyboard() {
        return true;
    }
}