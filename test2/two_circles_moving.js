let canvas, stage;

function init() {
    canvas = document.getElementById("testCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    let stage = new createjs.Stage("testCanvas");

    createjs.Ticker.addEventListener("tick", function (event) {
        stage.update(event);
    });
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // Create the MovieClip
    let mc = new createjs.MovieClip({loop:-1, labels: {start: 0, middle: 20}});
    mc.framerate = 20;
    stage.addChild(mc);
    // Create the States. Each state is just a circle shape.
    let greyCircle = new createjs.Shape(
        new createjs.Graphics().beginFill("#999999")
            .drawCircle(110, 200, 50));

    let blueCircle = new createjs.Shape(
        new createjs.Graphics().beginFill("#6699FF")
            .drawCircle(100, 200, 50));
    // Create a tween for each shape, animating from one side to the other.
    mc.timeline.addTween(
        createjs.Tween.get(greyCircle, {paused:true})
            .to({x: 0}).to({x: 760}, 40).to({x: 0}, 40));
    mc.timeline.addTween(
        createjs.Tween.get(blueCircle, {paused:true})
            .to({x: 760}).to({x: 0}, 40).to({x: 760}, 40));

    //mc.stop();
    // Play the animation starting when the circles are in the middle. See the MovieClip constructor above where the labels are specified.
    mc.gotoAndPlay("middle");
}