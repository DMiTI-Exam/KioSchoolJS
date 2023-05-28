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

window.onload = function () {
    init();
}

function init() {
    // create stage and point it to the canvas:
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);

    stage.enableMouseOver(20);

    /*let blueRectangle = new createjs.Shape();
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
    /!*tf.addEventListener("click", function (e) {
        e.target.select();
    });*!/

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
    stage.addChild(helpButtonBack);*/

    let mainContainer = new createjs.Container();
    let map = new createjs.Bitmap("prim/_resources/map.png");
    mainContainer.addChild(map);

    stage.addChild(mainContainer);
    let vFill1_mc = new createjs.Bitmap("prim/_resources/VFill1_mc.png");
    vFill1_mc.name = "VFill1_mc";
    vFill1_mc.regX = 4.5;
    vFill1_mc.regY = 4.5;
    let circleContainer = new createjs.Container();
    circleContainer.addChild(vFill1_mc);

    let way = new createjs.Bitmap("prim/_resources/way.png");
    way.name = "way";
    let edgeContainer = new createjs.Container();
    edgeContainer.regX = 0.5;
    edgeContainer.regY = 95;
    edgeContainer.addChild(way);
// для нахождения scaleY длину длину гипотенузы на ребра делим
    let edge1 = _.cloneDeep(edgeContainer);
    edge1.x = 351;
    edge1.y = 233;
    edge1.rotation = 90-26.27;
    edge1.scaleY = 3.9;
    stage.addChild(edge1);

    let edge2 = _.cloneDeep(edgeContainer);
    edge2.x = 681.5;
    edge2.y = 69;
    edge2.rotation = 90+98.5;
    edge2.scaleY = 1.45;
    stage.addChild(edge2);

    let edge3 = _.cloneDeep(edgeContainer);
    edge3.x = 1323/2;
    edge3.y = 411/2;
    edge3.rotation = -120.5;
    edge3.scaleY = 1.2;
    stage.addChild(edge3);

    //анадырь якутск
    let edge4 = _.cloneDeep(edgeContainer);
    edge4.x = 681.5;
    edge4.y = 69;
    edge4.rotation = 90 + 90 + 31;
    edge4.scaleY = 2.35;
    stage.addChild(edge4);

    //благовещенск якутск
    let edge5 = _.cloneDeep(edgeContainer);
    edge5.x = 1243/2;
    edge5.y = 762/2;
    edge5.rotation = -25;
    edge5.scaleY = 1.4;
    stage.addChild(edge5);
    //дудинка якутск
    let edge6 = _.cloneDeep(edgeContainer);
    edge6.x = 351;
    edge6.y = 233;
    edge6.rotation = 90 + 7.3;
    edge6.scaleY = 2.3;
    stage.addChild(edge6);

    //тура якутск
    let edge7 = _.cloneDeep(edgeContainer);
    edge7.x = 1134/2;
    edge7.y = 523/2;
    edge7.rotation = -99.5;
    edge7.scaleY = 1.6;
    stage.addChild(edge7);

    //якутск чита
    let edge8 = _.cloneDeep(edgeContainer);
    edge8.x = 1134/2;
    edge8.y = 523/2;
    edge8.rotation = 90 +106.5;
    edge8.scaleY = 1.6;
    stage.addChild(edge8);

    //якутск красноярск
    let edge9 = _.cloneDeep(edgeContainer);
    edge9.x = 1134/2;
    edge9.y = 523/2;
    edge9.rotation = 90 +144;
    edge9.scaleY = 2.3;
    stage.addChild(edge9);

    //дудинка красноярск
    let edge10 = _.cloneDeep(edgeContainer);
    edge10.x = 787/2;
    edge10.y = 775/2;
    edge10.rotation = -15.5;
    edge10.scaleY = 1.65;
    stage.addChild(edge10);

    //чита красноярск
    let edge11 = _.cloneDeep(edgeContainer);
    edge11.x = 787/2;
    edge11.y = 775/2;
    edge11.rotation = 90 + 7.5;
    edge11.scaleY = 1.4;
    stage.addChild(edge11);

    //банрнаул красноярск
    let edge12 = _.cloneDeep(edgeContainer);
    edge12.x = 787/2;
    edge12.y = 775/2;
    edge12.rotation = 90 + 153;
    edge12.scaleY = 0.7;
    stage.addChild(edge12);

    //omsk красноярск
    let edge13 = _.cloneDeep(edgeContainer);
    edge13.x = 787/2;
    edge13.y = 775/2;
    edge13.rotation = 90 + 180.2;
    edge13.scaleY = 1.3;
    stage.addChild(edge13);

    //hantimansiysk красноярск
    let edge14 = _.cloneDeep(edgeContainer);
    edge14.x = 787/2;
    edge14.y = 775/2;
    edge14.rotation = -59.5;
    edge14.scaleY = 1.65;
    stage.addChild(edge14);

    //тура красноярск
    let edge15 = _.cloneDeep(edgeContainer);
    edge15.x = 787/2;
    edge15.y = 775/2;
    edge15.rotation = 11.5;
    edge15.scaleY = 1.1;
    stage.addChild(edge15);

    //тура хантыманты
    let edge16 = _.cloneDeep(edgeContainer);
    edge16.x = 830/2;
    edge16.y = 575/2;
    edge16.rotation = -99;
    edge16.scaleY = 1.67;
    stage.addChild(edge16);

    //тура дудинка
    let edge17 = _.cloneDeep(edgeContainer);
    edge17.x = 830/2;
    edge17.y = 575/2;
    edge17.rotation = -50;
    edge17.scaleY = 1;
    stage.addChild(edge17);

    //тура дудинка
    let edge23= _.cloneDeep(edgeContainer);
    edge23.x = 830/2;
    edge23.y = 575/2;
    edge23.rotation = 90 + 47 ;
    edge23.scaleY = 1.65;
    stage.addChild(edge23);

    //дудинка сыктывкар
    let edge18 = _.cloneDeep(edgeContainer);
    edge18.x =351;
    edge18.y = 233;
    edge18.rotation = -90 - 11;
    edge18.scaleY = 1.9;
    stage.addChild(edge18);

    //дудинка хантыманты
    let edge19 = _.cloneDeep(edgeContainer);
    edge19.x =351;
    edge19.y = 233;
    edge19.rotation = -90 - 41;
    edge19.scaleY = 1.2;
    stage.addChild(edge19);

    //хантыманты сыктывкар
    let edge20 = _.cloneDeep(edgeContainer);
    edge20.x = 525/2;
    edge20.y = 621/2;
    edge20.rotation = -62;
    edge20.scaleY = 1;
    stage.addChild(edge20);

    //хантыманты омск
    let edge21 = _.cloneDeep(edgeContainer);
    edge21.x = 525/2;
    edge21.y = 621/2;
    edge21.rotation = 175;
    edge21.scaleY = 0.85;
    stage.addChild(edge21);

    //хантыманты барнаул
    let edge22 = _.cloneDeep(edgeContainer);
    edge22.x = 525/2;
    edge22.y = 621/2;
    edge22.rotation = 147.5;
    edge22.scaleY = 1.3;
    stage.addChild(edge22);

    //хантыманты пермь
    let edge24 = _.cloneDeep(edgeContainer);
    edge24.x = 525/2;
    edge24.y = 621/2;
    edge24.rotation = -98.5;
    edge24.scaleY = 0.8;
    stage.addChild(edge24);

    //омск пермь
    let edge25 = _.cloneDeep(edgeContainer);
    edge25.x = 270.5;
    edge25.y = 387;
    edge25.rotation = -51.5;
    edge25.scaleY = 1.15;
    stage.addChild(edge25);

    //омск пермь
    let edge26 = _.cloneDeep(edgeContainer);
    edge26.x = 270.5;
    edge26.y = 387;
    edge26.rotation = 90 + 26.7;
    edge26.scaleY = 0.75;
    stage.addChild(edge26);

    //барнауо чита
    let edge27 = _.cloneDeep(edgeContainer);
    edge27.x = 663/2;
    edge27.y = 837/2;
    edge27.rotation = 90 -4;
    edge27.scaleY = 2.05;
    stage.addChild(edge27);

    //сыктывкар пермь
    let edge28 = _.cloneDeep(edgeContainer);
    edge28.x = 358/2;
    edge28.y = 535/2;
    edge28.rotation = 180-8;
    edge28.scaleY = 0.6;
    stage.addChild(edge28);

    //сыктывкар архангельск
    let edge29 = _.cloneDeep(edgeContainer);
    edge29.x = 358/2;
    edge29.y = 535/2;
    edge29.rotation = -18.5;
    edge29.scaleY = 0.6;
    stage.addChild(edge29);

    //сыктывкар СПБ
    let edge30 = _.cloneDeep(edgeContainer);
    edge30.x = 358/2;
    edge30.y = 535/2;
    edge30.rotation = -60;
    edge30.scaleY = 1.1;
    stage.addChild(edge30);

    //сыктывкар мск
    let edge31 = _.cloneDeep(edgeContainer);
    edge31.x = 358/2;
    edge31.y = 535/2;
    edge31.rotation = -95.5;
    edge31.scaleY = 1.05;
    stage.addChild(edge31);

    //сыктывкар саратов
    let edge32 = _.cloneDeep(edgeContainer);
    edge32.x = 358/2;
    edge32.y = 535/2;
    edge32.rotation = -90 -44;
    edge32.scaleY = 1.12;
    stage.addChild(edge32);

    //СПБ  белгород
    let edge33 = _.cloneDeep(edgeContainer);
    edge33.x = 88.5;
    edge33.y = 215.5;
    edge33.rotation = -90 -65;
    edge33.scaleY = 1.12;
    stage.addChild(edge33);

    //СПБ  архангельск
    let edge34 = _.cloneDeep(edgeContainer);
    edge34.x = 88.5;
    edge34.y = 215.5;
    edge34.rotation = 90-1;
    edge34.scaleY = 0.76;
    stage.addChild(edge34);

    //СПБ  мск
    let edge35 = _.cloneDeep(edgeContainer);
    edge35.x = 88.5;
    edge35.y = 215.5;
    edge35.rotation = 180+5;
    edge35.scaleY = 0.67;
    stage.addChild(edge35);

    // мск архангельск
    let edge36 = _.cloneDeep(edgeContainer);
    edge36.x = 84;
    edge36.y = 275.5;
    edge36.rotation = 52;
    edge36.scaleY = 1;
    stage.addChild(edge36);

    // мск белгород
    let edge37 = _.cloneDeep(edgeContainer);
    edge37.x = 84;
    edge37.y = 275.5;
    edge37.rotation = -90-42;
    edge37.scaleY =0.6;
    stage.addChild(edge37);

    // мск белгород
    let edge38 = _.cloneDeep(edgeContainer);
    edge38.x = 84;
    edge38.y = 275.5;
    edge38.rotation = 180 -12;
    edge38.scaleY =0.75;
    stage.addChild(edge38);

    // мск белгород
    let edge39 = _.cloneDeep(edgeContainer);
    edge39.x = 84;
    edge39.y = 275.5;
    edge39.rotation = 90 +24;
    edge39.scaleY =1.15;
    stage.addChild(edge39);

    // саратов оренбург
    let edge40 = _.cloneDeep(edgeContainer);
    edge40.x = 99.5;
    edge40.y = 344;
    edge40.rotation = 90 +32;
    edge40.scaleY =0.65;
    stage.addChild(edge40);

    // саратов 'элиста'
    let edge41 = _.cloneDeep(edgeContainer);
    edge41.x = 99.5;
    edge41.y = 344;
    edge41.rotation = 180+45;
    edge41.scaleY =0.65;
    stage.addChild(edge41);

    // саратов 'элиста'
    let edge42 = _.cloneDeep(edgeContainer);
    edge42.x = 99.5;
    edge42.y = 344;
    edge42.rotation = -58.6;
    edge42.scaleY =0.65;
    stage.addChild(edge42);

    // саратов пермь'
    let edge43 = _.cloneDeep(edgeContainer);
    edge43.x = 99.5;
    edge43.y = 344;
    edge43.rotation = 90 -15;
    edge43.scaleY =1;
    stage.addChild(edge43);


    // оренбург пермь'
    let edge44 = _.cloneDeep(edgeContainer);
    edge44.x = 152.5;
    edge44.y = 375.5;
    edge44.rotation = 32;
    edge44.scaleY =0.7;
    stage.addChild(edge44);

    // белгород элиста
    let edge45 = _.cloneDeep(edgeContainer);
    edge45.x = 115/2;
    edge45.y = 770/2;
    edge45.rotation = -11;
    edge45.scaleY =0.8;
    stage.addChild(edge45);





    let anadirCity = _.cloneDeep(circleContainer);
    anadirCity.x = 681.5;
    anadirCity.y = 69;
    stage.addChild(anadirCity);

    let dudinkaCity = _.cloneDeep(circleContainer);
    dudinkaCity.x = 351;
    dudinkaCity.y = 233;
    stage.addChild(dudinkaCity);

    let saratovCity = _.cloneDeep(circleContainer);
    saratovCity.x = 99.5;
    saratovCity.y = 344;
    stage.addChild(saratovCity);

    let SaintPetersburgCity = _.cloneDeep(circleContainer);
    SaintPetersburgCity.x = 88.5;
    SaintPetersburgCity.y = 215.5;
    stage.addChild(SaintPetersburgCity);

    let permCity = _.cloneDeep(circleContainer);
    permCity.x = 187.5;
    permCity.y = 320.5;
    stage.addChild(permCity);

    let orenburgCity = _.cloneDeep(circleContainer);
    orenburgCity.x = 152.5;
    orenburgCity.y = 375.5;
    stage.addChild(orenburgCity);

    let omskCity = _.cloneDeep(circleContainer);
    omskCity.x = 270.5;
    omskCity.y = 387;
    stage.addChild(omskCity);

    let moscowCity = _.cloneDeep(circleContainer);
    moscowCity.x = 84;
    moscowCity.y = 275.5;
    stage.addChild(moscowCity);


    let magadanCity = _.cloneDeep(circleContainer);
    magadanCity.x = 1323/2;
    magadanCity.y = 411/2;
    stage.addChild(magadanCity);

    let krasnoyarskCity = _.cloneDeep(circleContainer);
    krasnoyarskCity.x = 787/2;
    krasnoyarskCity.y = 775/2;
    stage.addChild(krasnoyarskCity);

    let blagoveshenskCity = _.cloneDeep(circleContainer);
    blagoveshenskCity.x = 1243/2;
    blagoveshenskCity.y = 762/2;
    stage.addChild(blagoveshenskCity);

    let belgorodCity = _.cloneDeep(circleContainer);
    belgorodCity.x = 87/2;
    belgorodCity.y = 622/2;
    stage.addChild(belgorodCity);

    let barnaulCity = _.cloneDeep(circleContainer);
    barnaulCity.x = 663/2;
    barnaulCity.y = 837/2;
    stage.addChild(barnaulCity);

    let archangelskCity = _.cloneDeep(circleContainer);
    archangelskCity.x = 321/2;
    archangelskCity.y = 429/2;
    stage.addChild(archangelskCity);

    let yakutskCity = _.cloneDeep(circleContainer);
    yakutskCity.x = 1134/2;
    yakutskCity.y = 523/2;
    stage.addChild(yakutskCity);

    let elistaCity = _.cloneDeep(circleContainer);
    elistaCity.x = 115/2;
    elistaCity.y = 770/2;
    stage.addChild(elistaCity);

    let chitaCity = _.cloneDeep(circleContainer);
    chitaCity.x = 1051/2;
    chitaCity.y = 810/2;
    stage.addChild(chitaCity);

    let turaCity = _.cloneDeep(circleContainer);
    turaCity.x = 830/2;
    turaCity.y = 575/2;
    stage.addChild(turaCity);

    let huntiMansiyuskCity = _.cloneDeep(circleContainer);
    huntiMansiyuskCity.x = 525/2;
    huntiMansiyuskCity.y = 621/2;
    stage.addChild(huntiMansiyuskCity);

    let siktivkarCity = _.cloneDeep(circleContainer);
    siktivkarCity.x = 358/2;
    siktivkarCity.y = 535/2;
    stage.addChild(siktivkarCity);

    let anadirTxt =  new createjs.Text("Анадырь", "10px Verdana", "#000000");
    anadirTxt.lineWidth = 189;
    anadirTxt.x = 630;
    anadirTxt.y = 50;
    stage.addChild(anadirTxt);

    let magadanTxt =  new createjs.Text("Магадан", "10px Verdana", "#000000");
    magadanTxt.lineWidth = 189;
    magadanTxt.x = 610;
    magadanTxt.y = 200;
    stage.addChild(magadanTxt);

    let yakutskTxt =  new createjs.Text("Якутск", "10px Verdana", "#000000");
    yakutskTxt.lineWidth = 189;
    yakutskTxt.x = 575;
    yakutskTxt.y = 255;
    stage.addChild(yakutskTxt);

    let blagoveshenskTxt =  new createjs.Text("Благовещенск", "10px Verdana", "#000000");
    blagoveshenskTxt.lineWidth = 189;
    blagoveshenskTxt.x = 630;
    blagoveshenskTxt.y = 360;
    stage.addChild(blagoveshenskTxt);

    let chitaTxt =  new createjs.Text("Чита", "10px Verdana", "#000000");
    chitaTxt.lineWidth = 189;
    chitaTxt.x = 530;
    chitaTxt.y = 395;
    stage.addChild(chitaTxt);

    let turaTxt =  new createjs.Text("Тура", "10px Verdana", "#000000");
    turaTxt.lineWidth = 189;
    turaTxt.x = 430;
    turaTxt.y = 290;
    stage.addChild(turaTxt);

    let krasnoyarskCityTxt =  new createjs.Text("Красноярск", "11px Verdana", "#000000");
    krasnoyarskCityTxt.lineWidth = 189;
    krasnoyarskCityTxt.x = 410;
    krasnoyarskCityTxt.y = 380;
    stage.addChild(krasnoyarskCityTxt);

    let dudinkaCityTxt =  new createjs.Text("Дудинка", "10px Verdana", "#000000");
    dudinkaCityTxt.lineWidth = 189;
    dudinkaCityTxt.x = 380;
    dudinkaCityTxt.y = 220;
    stage.addChild(dudinkaCityTxt);

    let barnaulCityTxt =  new createjs.Text("Барнаул", "10px Verdana", "#000000");
    barnaulCityTxt.lineWidth = 189;
    barnaulCityTxt.x = 350;
    barnaulCityTxt.y = 420;
    stage.addChild(barnaulCityTxt);

    let omskCityTxt =  new createjs.Text("Омск", "10px Verdana", "#000000");
    omskCityTxt.lineWidth = 189;
    omskCityTxt.x = 275;
    omskCityTxt.y = 370;
    stage.addChild(omskCityTxt);

    let hantimansiyskСityTxt =  new createjs.Text("Ханты-Мансийск", "10px Verdana", "#000000");
    hantimansiyskСityTxt.lineWidth = 189;
    hantimansiyskСityTxt.x = 280;
    hantimansiyskСityTxt.y = 310;
    stage.addChild(hantimansiyskСityTxt);

    let permCityTxt =  new createjs.Text("Пермь", "10px Verdana", "#000000");
    permCityTxt.lineWidth = 189;
    permCityTxt.x = 200;
    permCityTxt.y = 320;
    stage.addChild(permCityTxt);

    let siktivkarCityTxt =  new createjs.Text("Сыктывкар", "10px Verdana", "#000000");
    siktivkarCityTxt.lineWidth = 189;
    siktivkarCityTxt.x = 200;
    siktivkarCityTxt.y = 265;
    stage.addChild(siktivkarCityTxt);

    let archangelskCityTxt =  new createjs.Text("Архангельск", "10px Verdana", "#000000");
    archangelskCityTxt.lineWidth = 189;
    archangelskCityTxt.x = 170;
    archangelskCityTxt.y = 215;
    stage.addChild(archangelskCityTxt);

    let orenburgCityTxt =  new createjs.Text("Оренбург", "10px Verdana", "#000000");
    orenburgCityTxt.lineWidth = 189;
    orenburgCityTxt.x = 160;
    orenburgCityTxt.y = 365;
    stage.addChild(orenburgCityTxt);

    let saratovCityTxt =  new createjs.Text("Саратов", "10px Verdana", "#000000");
    saratovCityTxt.lineWidth = 189;
    saratovCityTxt.x = 120;
    saratovCityTxt.y = 340;
    stage.addChild(saratovCityTxt);

    let moscowCityyTxt =  new createjs.Text("Москва", "10px Verdana", "#000000");
    moscowCityyTxt.lineWidth = 189;
    moscowCityyTxt.x = 105;
    moscowCityyTxt.y = 275;
    stage.addChild(moscowCityyTxt);

    let SaintPetersburgCityTxt =  new createjs.Text("Санкт-Петербург", "10px Verdana", "#000000");
    SaintPetersburgCityTxt.lineWidth = 189;
    SaintPetersburgCityTxt.x =0;
    SaintPetersburgCityTxt.y = 220;
    stage.addChild(SaintPetersburgCityTxt);

    let elistaCityTxt =  new createjs.Text("Элиста", "10px Verdana", "#000000");
    elistaCityTxt.lineWidth = 189;
    elistaCityTxt.x =35;
    elistaCityTxt.y = 390;
    stage.addChild(elistaCityTxt);

    let belgorodCityTxt =  new createjs.Text("Белгород", "10px Verdana", "#000000");
    belgorodCityTxt.lineWidth = 189;
    belgorodCityTxt.x =50;
    belgorodCityTxt.y = 306;
    stage.addChild(belgorodCityTxt);

    //animateStrangeShape(strangeShape);
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
