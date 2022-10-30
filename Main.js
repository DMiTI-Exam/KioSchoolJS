let canvas, stage;

function init() {
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);

    createjs.Touch.enable(stage);

    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true;
}