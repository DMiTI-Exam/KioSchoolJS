import{ILayoutable}from"../layout/ILayoutable.js";import{ComponentLayout}from"../layout/ComponentLayout.js";export class BorderedBackground extends ILayoutable{static BORDER_COLOR="#B0D7F2";static BORDER_WIDTH=6;#layout;constructor(width,height){super();let backgroundShape=new createjs.Shape;this.addChild(backgroundShape);this.#layout=new ComponentLayout(this);backgroundShape.graphics.beginFill(BorderedBackground.BORDER_COLOR);backgroundShape.graphics.drawRect(0,0,width,height);backgroundShape.graphics.endFill();backgroundShape.graphics.beginFill("#FFFFFF");backgroundShape.graphics.drawRect(BorderedBackground.BORDER_WIDTH,BorderedBackground.BORDER_WIDTH,width-BorderedBackground.BORDER_WIDTH*2,height-BorderedBackground.BORDER_WIDTH*2);backgroundShape.graphics.endFill()}getLayout(){return this.#layout}}