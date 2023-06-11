import{IManipulatorHelper}from"../../kioschool/controller/IManipulatorHelper.js";import{SelectBoundaryEdgesStep}from"../steps/SelectBoundaryEdgesStep.js";import{GraphConstructor}from"../utils/GraphConstructor.js";export class PrimController extends IManipulatorHelper{static ID="prim";static#instance;static#canConstruct=false;#graph;static instanceGetter(){if(PrimController.#instance==null){PrimController.#canConstruct=true;PrimController.#instance=new PrimController;PrimController.#canConstruct=false}return this.#instance}constructor(){super();if(!PrimController.#canConstruct){throw new Error("Cannot construct a singleton class")}}idGetter(){return PrimController.ID}init(){this.#graph=GraphConstructor.parseGraph();this.graphGetter().vertexesGetter()[Math.floor(Math.random()*this.#graph.vertexesGetter().length)].inTreeSetter(true)}regimeChanged(regime){}firstStepGetter(){return new SelectBoundaryEdgesStep}greetingGetter(){return"Постройте минимальное остовное дерево (МОД) как последовательность расширяющихся поддеревьев "+"при помощи алгоритма Прима."}graphGetter(){return this.#graph}equal(firstArray,secondArray){if(firstArray.length!==secondArray.length){return false}let equal=true;for(let edge of firstArray){if(secondArray.indexOf(edge)===-1){equal=false}}return equal}redrawInFinalGetter(){return false}redraw(workspace){}needKeyboard(){return false}}