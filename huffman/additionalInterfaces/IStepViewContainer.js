export class IStepViewContainer extends createjs.Container {
    constructor() {
        super();

        if (this.constructor === IStepViewContainer) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    // unique method for step view. It should be implemented like nothing was drawn before.
    // at the end of the method all graphical objects should be added to the workspace using .addChild method
    draw(workspace) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}