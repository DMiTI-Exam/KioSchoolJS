import { Vertex } from "../../kioschool/basic/model/Vertex.js"

/**
 * Вершина графа для алгоритма построения максимального парасочетания
 *
 * Дополнительно содержит признак принадлежности к первой доле
 */
export class MatchingVertex extends Vertex {
    #component = -1;
    #partMarked = false;
    #dotMarked = false;

    /**
     * Признак приналежности вершины первой доле
     */
    #firstPart;

    #lastFirstPart;
    #x;
    #y;
    #chainX;
    #chainY;
    #sourceTargetSelected = false;
    #lastSourceTargetSelected = false;

    constructor(x, y, firstPart = true) {
        super();

        this.#firstPart = firstPart;
        this.#x = x;
        this.#y = y;
        this.#chainX = x;
        this.#chainY = y;
    }

    /**
     * Получает признак того, что вершина принадлежит первой доле
     */
    firstPartGetter() {
        return this.#firstPart;
    }

    /**
     * Устанавливает признак того, что вершина  принадлежит первой доле
     */
    firstPartSetter(value) {
        this.#firstPart = value;
        this.updateViews()
    }

    xGetter() {
        return this.#x;
    }

    xSetter(value) {
        this.#x = value;
    }

    yGetter() {
        return this.#y;
    }

    ySetter(value) {
        this.#y = value;
    }

    partMarkedGetter() {
        return this.#partMarked;
    }

    partMarkedSetter(value) {
        this.#partMarked = value;
    }

    dotMarkedGetter() {
        return this.#dotMarked;
    }

    dotMarkedSetter(value) {
        this.#dotMarked = value;
    }

    chainXGetter() {
        return this.#chainX;
    }

    chainXSetter(value) {
        this.#chainX = value;
    }

    chainYGetter() {
        return this.#chainY;
    }

    chainYSetter(value) {
        return this.#chainY = value;
    }

    lastFirstPartGetter() {
        return this.#lastFirstPart;
    }

    lastFirstPartSetter(value) {
        this.#lastFirstPart = value;
    }

    sourceTargetSelectedGetter() {
        return this.#sourceTargetSelected;
    }

    sourceTargetSelectedSetter(value) {
        this.#sourceTargetSelected = value;
    }

    lastSourceTargetSelectedGetter() {
        return this.#lastSourceTargetSelected;
    }

    lastSourceTargetSelectedSetter(value) {
        this.#lastSourceTargetSelected = value;
    }

    componentGetter() {
        return this.#component;
    }

    componentSetter(value) {
        this.#component = value;
    }
}