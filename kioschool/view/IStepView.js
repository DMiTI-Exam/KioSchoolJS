export class IStepView{constructor(){if(this.constructor===IStepView){throw new Error("Abstract class can't be instantiated")}}draw(workspace){throw new Error("Abstract method: must be overridden in a subclass")}}