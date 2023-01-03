import { TextField } from "../additionalComponents/TextField.js";
import { TextFormat } from "../additionalComponents/TextFormat.js";
import { ErrorComment } from "../kioschool/gui/ErrorComment.js";
import { DefaultNavigationButtons } from "../kioschool/gui/DefaultNavigationButtons.js";
import { DefaultRegimeButtons } from "../kioschool/gui/DefaultRegimeButtons.js";
import { DefaultHelpNavigationButtons } from "../kioschool/gui/DefaultHelpNavigationButtons.js";
import { DefaultCheckButtons } from "../kioschool/gui/DefaultCheckButtons.js";
import { HelpButton } from "../kioschool/gui/HelpButton.js";
import { HelpButtonBack } from "../kioschool/gui/HelpButtonBack.js";

let canvas, stage;

/*window.onload = function () {
    init();
}*/

function init() {
    // create stage and point it to the canvas:
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);

    stage.enableMouseOver(20);

    let blueRectangle = new createjs.Shape();
    let redCircle = new createjs.Shape();
    let greenTriangle = new createjs.Shape();
    let strangeShape = new createjs.Shape();

    blueRectangle.graphics.setStrokeStyle(1);
    blueRectangle.graphics.beginStroke(createjs.Graphics.getRGB(255,0,0));
    blueRectangle.graphics.beginFill(createjs.Graphics.getRGB(0,0,255));
    blueRectangle.graphics.drawRect(5, 10, 30, 50);

    redCircle.graphics.setStrokeStyle(1);
    redCircle.graphics.beginStroke(createjs.Graphics.getRGB(255,0,0));
    redCircle.graphics.beginFill(createjs.Graphics.getRGB(255,0,0));
    redCircle.graphics.drawCircle(60, 50, 20);

    greenTriangle.graphics.setStrokeStyle(1);
    greenTriangle.graphics.beginStroke(createjs.Graphics.getRGB(0,255,0));
    greenTriangle.graphics.beginFill(createjs.Graphics.getRGB(0,255,0));
    greenTriangle.graphics.moveTo(40, 100)
        .lineTo(50, 80)
        .lineTo(60, 100)
        .lineTo(40, 100);

    strangeShape.graphics.setStrokeStyle(4)
        .beginStroke(createjs.Graphics.getRGB(255,0,255))
        .moveTo(120, 100)
        .lineTo(180, 80)
        //.endStroke()
        .setStrokeDash([5, 5], 0)
        .beginStroke(createjs.Graphics.getRGB(0, 255, 255))
        .moveTo(180, 80)
        .lineTo(115, 50)
        //.endStroke()
        .lineTo(150, 50)
        .lineTo(150, 200)
        .endStroke()
        .beginStroke(createjs.Graphics.getRGB(0, 255, 0))
        .moveTo(150, 200)
        .lineTo(120, 100);

    let formatter = new TextFormat("Comic Sans", 24, "#BBBB00", true, true, true, 'left', 5, null);

    let c = new createjs.Container();
    let tf = new TextField(c);
    tf.setBorder(true);
    tf.setBorderColor("#1A9BFF");
    tf.setBackgroundColor("#5F8901");
    tf.setHeight(80);
    tf.setMaxChars(30);
    tf.setMultiline(true);
    tf.setPattern("0-9A-Z_ !");
    //tf.setSelectable(false);
    tf.setText("Hello world!");
    //tf.setType("dynamic");
    //tf.setType("input");
    //tf.setTextColor("#BBBB00");
    //tf.setVisible(false);
    tf.setWidth(200);
    tf.setWordWrap(false);
    tf.setX(10);
    tf.setY(10);
    tf.addEventListener("mouseover", function () {
        tf.setGlow(true, 0, 0, 18, '#E863E8');
    });
    tf.addEventListener("mouseout", function () {
        tf.setGlow(false);
    });
    tf.setTextFormat(formatter);
    c.x = 30;
    c.y = 110;
    //tf.addEventListener("input", logIt);
    /*tf.addEventListener("click", function (e) {
        e.target.select();
    });*/

    let comment = new ErrorComment();
    comment.x = 30;
    comment.y = 200;

    let navButtons = new DefaultNavigationButtons();
    navButtons.x = 280;
    navButtons.y = 50;

    let navHelpButtons = new DefaultHelpNavigationButtons();
    navHelpButtons.x = 280;
    navHelpButtons.y = 105;

    let regimeButtons = new DefaultRegimeButtons();
    regimeButtons.x = 280;
    regimeButtons.y = 160;
    regimeButtons.selectButton(regimeButtons.demoButtonHelper);

    regimeButtons.demoButtonHelper.target.addEventListener("mousedown", function (event) {
        regimeButtons.selectButton(regimeButtons.demoButtonHelper);
    });

    regimeButtons.trainButtonHelper.target.addEventListener("mousedown", function (event) {
        regimeButtons.selectButton(regimeButtons.trainButtonHelper);
    });

    regimeButtons.controlButtonHelper.target.addEventListener("mousedown", function (event) {
        regimeButtons.selectButton(regimeButtons.controlButtonHelper);
    });

    let checkButtons = new DefaultCheckButtons();
    checkButtons.x = 280;
    checkButtons.y = 215;

    let helpButton = new HelpButton();
    helpButton.x = 280;
    helpButton.y = 255;

    let helpButtonBack = new HelpButtonBack();
    helpButtonBack.x = 310;
    helpButtonBack.y = 255;

    stage.addChild(blueRectangle);
    stage.addChild(redCircle);
    stage.addChild(greenTriangle);
    stage.addChild(strangeShape);
    stage.addChild(c);
    stage.addChild(comment);
    stage.addChild(navButtons);
    stage.addChild(navHelpButtons);
    stage.addChild(regimeButtons);
    stage.addChild(checkButtons);
    stage.addChild(helpButton);
    stage.addChild(helpButtonBack);

    animateStrangeShape(strangeShape);
    createjs.Ticker.on("tick", (_) => {
        stage.update();
    });
}

function animateStrangeShape(strangeShape) {
    createjs.Tween.get(strangeShape, { loop: true })
        .to({ x: 500 }, 2000, createjs.Ease.getPowInOut(1))
        .to({ x: 300, y: 200 }, 2000, createjs.Ease.getPowInOut(1))
        .to({ x: 0 }, 2000, createjs.Ease.getPowInOut(1))
        .to({ y: 0 }, 2000, createjs.Ease.getPowInOut(1));
}
