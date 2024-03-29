export class CMap extends createjs.Container {
    constructor() {
        super();

        let map = new createjs.Bitmap("prim/_resource/map.png");
        this.addChild(map);

        let textContainer = new createjs.Container();

        let anadyrCityTxt =  new createjs.Text("Анадырь", "10px Verdana", "#000000");
        anadyrCityTxt.lineWidth = 189;
        anadyrCityTxt.x = 630;
        anadyrCityTxt.y = 50;
        textContainer.addChild(anadyrCityTxt);

        let magadanCityTxt =  new createjs.Text("Магадан", "10px Verdana", "#000000");
        magadanCityTxt.lineWidth = 189;
        magadanCityTxt.x = 610;
        magadanCityTxt.y = 200;
        textContainer.addChild(magadanCityTxt);

        let yakutskCityTxt =  new createjs.Text("Якутск", "10px Verdana", "#000000");
        yakutskCityTxt.lineWidth = 189;
        yakutskCityTxt.x = 575;
        yakutskCityTxt.y = 255;
        textContainer.addChild(yakutskCityTxt);

        let blagoveshchenskCityTxt =  new createjs.Text("Благовещенск", "10px Verdana", "#000000");
        blagoveshchenskCityTxt.lineWidth = 189;
        blagoveshchenskCityTxt.x = 630;
        blagoveshchenskCityTxt.y = 360;
        textContainer.addChild(blagoveshchenskCityTxt);

        let chitaCityTxt =  new createjs.Text("Чита", "10px Verdana", "#000000");
        chitaCityTxt.lineWidth = 189;
        chitaCityTxt.x = 530;
        chitaCityTxt.y = 395;
        textContainer.addChild(chitaCityTxt);

        let turaCityTxt =  new createjs.Text("Тура", "10px Verdana", "#000000");
        turaCityTxt.lineWidth = 189;
        turaCityTxt.x = 430;
        turaCityTxt.y = 290;
        textContainer.addChild(turaCityTxt);

        let krasnoyarskCityTxt =  new createjs.Text("Красноярск", "11px Verdana", "#000000");
        krasnoyarskCityTxt.lineWidth = 189;
        krasnoyarskCityTxt.x = 410;
        krasnoyarskCityTxt.y = 380;
        textContainer.addChild(krasnoyarskCityTxt);

        let dudinkaCityTxt =  new createjs.Text("Дудинка", "10px Verdana", "#000000");
        dudinkaCityTxt.lineWidth = 189;
        dudinkaCityTxt.x = 380;
        dudinkaCityTxt.y = 220;
        textContainer.addChild(dudinkaCityTxt);

        let barnaulCityTxt =  new createjs.Text("Барнаул", "10px Verdana", "#000000");
        barnaulCityTxt.lineWidth = 189;
        barnaulCityTxt.x = 350;
        barnaulCityTxt.y = 420;
        textContainer.addChild(barnaulCityTxt);

        let omskCityTxt =  new createjs.Text("Омск", "10px Verdana", "#000000");
        omskCityTxt.lineWidth = 189;
        omskCityTxt.x = 275;
        omskCityTxt.y = 370;
        textContainer.addChild(omskCityTxt);

        let khantyMansiyskCityTxt =  new createjs.Text("Ханты-Мансийск", "10px Verdana", "#000000");
        khantyMansiyskCityTxt.lineWidth = 189;
        khantyMansiyskCityTxt.x = 280;
        khantyMansiyskCityTxt.y = 310;
        textContainer.addChild(khantyMansiyskCityTxt);

        let permCityTxt =  new createjs.Text("Пермь", "10px Verdana", "#000000");
        permCityTxt.lineWidth = 189;
        permCityTxt.x = 200;
        permCityTxt.y = 320;
        textContainer.addChild(permCityTxt);

        let syktyvkarCityTxt =  new createjs.Text("Сыктывкар", "10px Verdana", "#000000");
        syktyvkarCityTxt.lineWidth = 189;
        syktyvkarCityTxt.x = 200;
        syktyvkarCityTxt.y = 265;
        textContainer.addChild(syktyvkarCityTxt);

        let arkhangelskCityTxt =  new createjs.Text("Архангельск", "10px Verdana", "#000000");
        arkhangelskCityTxt.lineWidth = 189;
        arkhangelskCityTxt.x = 170;
        arkhangelskCityTxt.y = 215;
        textContainer.addChild(arkhangelskCityTxt);

        let orenburgCityTxt =  new createjs.Text("Оренбург", "10px Verdana", "#000000");
        orenburgCityTxt.lineWidth = 189;
        orenburgCityTxt.x = 160;
        orenburgCityTxt.y = 365;
        textContainer.addChild(orenburgCityTxt);

        let saratovCityTxt =  new createjs.Text("Саратов", "10px Verdana", "#000000");
        saratovCityTxt.lineWidth = 189;
        saratovCityTxt.x = 120;
        saratovCityTxt.y = 340;
        textContainer.addChild(saratovCityTxt);

        let moscowCityTxt =  new createjs.Text("Москва", "10px Verdana", "#000000");
        moscowCityTxt.lineWidth = 189;
        moscowCityTxt.x = 105;
        moscowCityTxt.y = 275;
        textContainer.addChild(moscowCityTxt);

        let saintPetersburgCityTxt =  new createjs.Text("Санкт-Петербург", "10px Verdana", "#000000");
        saintPetersburgCityTxt.lineWidth = 189;
        saintPetersburgCityTxt.x =0;
        saintPetersburgCityTxt.y = 220;
        textContainer.addChild(saintPetersburgCityTxt);

        let elistaCityTxt =  new createjs.Text("Элиста", "10px Verdana", "#000000");
        elistaCityTxt.lineWidth = 189;
        elistaCityTxt.x =35;
        elistaCityTxt.y = 390;
        textContainer.addChild(elistaCityTxt);

        let belgorodCityTxt =  new createjs.Text("Белгород", "10px Verdana", "#000000");
        belgorodCityTxt.lineWidth = 189;
        belgorodCityTxt.x =50;
        belgorodCityTxt.y = 306;
        textContainer.addChild(belgorodCityTxt);

        this.addChild(textContainer);

        // Edge pattern
        let way = new createjs.Bitmap("prim/_resource/way.png");
        way.name = "way_mc";
        way.regX = 0.5;
        way.regY = 95;
        let edgeContainer = new createjs.Container();
        edgeContainer.addChild(way);

        // Дудинка-Анадырь
        let edge1 = _.cloneDeep(edgeContainer);
        edge1.x = 351;
        edge1.y = 233;
        edge1.rotation = 90-26.27;
        edge1.scaleY = 3.9;
        this.addChild(edge1);

        // Анадырь-Магадан
        let edge2 = _.cloneDeep(edgeContainer);
        edge2.x = 681.5;
        edge2.y = 69;
        edge2.rotation = -171.7;
        edge2.scaleY = 1.45;
        this.addChild(edge2);

        // Магадан-Якутск
        let edge3 = _.cloneDeep(edgeContainer);
        edge3.x = 1323/2;
        edge3.y = 411/2;
        edge3.rotation = -120.5;
        edge3.scaleY = 1.18;
        this.addChild(edge3);

        // Анадырь-Якутск
        let edge4 = _.cloneDeep(edgeContainer);
        edge4.x = 681.5;
        edge4.y = 69;
        edge4.rotation = -149;
        edge4.scaleY = 2.35;
        this.addChild(edge4);

        // Благовещенск-Якутск
        let edge5 = _.cloneDeep(edgeContainer);
        edge5.x = 1243/2;
        edge5.y = 762/2;
        edge5.rotation = -25;
        edge5.scaleY = 1.4;
        this.addChild(edge5);

        // Дудинка-Якутск
        let edge6 = _.cloneDeep(edgeContainer);
        edge6.x = 351;
        edge6.y = 233;
        edge6.rotation = 90 + 7.3;
        edge6.scaleY = 2.3;
        this.addChild(edge6);

        // Якутск-Тура
        let edge7 = _.cloneDeep(edgeContainer);
        edge7.x = 1134/2;
        edge7.y = 523/2;
        edge7.rotation = -99.5;
        edge7.scaleY = 1.6;
        this.addChild(edge7);

        // Якутск-Чита
        let edge8 = _.cloneDeep(edgeContainer);
        edge8.x = 1134/2;
        edge8.y = 523/2;
        edge8.rotation = -163.5;
        edge8.scaleY = 1.6;
        this.addChild(edge8);

        // Якутск-Красноярск
        let edge9 = _.cloneDeep(edgeContainer);
        edge9.x = 1134/2;
        edge9.y = 523/2;
        edge9.rotation = -126;
        edge9.scaleY = 2.27;
        this.addChild(edge9);

        // Красноярск-Дудинка
        let edge10 = _.cloneDeep(edgeContainer);
        edge10.x = 787/2;
        edge10.y = 775/2;
        edge10.rotation = -15.5;
        edge10.scaleY = 1.65;
        this.addChild(edge10);

        // Красноярск-Чита
        let edge11 = _.cloneDeep(edgeContainer);
        edge11.x = 787/2;
        edge11.y = 775/2;
        edge11.rotation = 90 + 7.5;
        edge11.scaleY = 1.4;
        this.addChild(edge11);

        // Красноярск-Барнаул
        let edge12 = _.cloneDeep(edgeContainer);
        edge12.x = 787/2;
        edge12.y = 775/2;
        edge12.rotation = -117;
        edge12.scaleY = 0.7;
        this.addChild(edge12);

        // Красноярск-Омск
        let edge13 = _.cloneDeep(edgeContainer);
        edge13.x = 787/2;
        edge13.y = 775/2;
        edge13.rotation = -89.8;
        edge13.scaleY = 1.3;
        this.addChild(edge13);

        // Красноярск-Ханты-Мансийск
        let edge14 = _.cloneDeep(edgeContainer);
        edge14.x = 787/2;
        edge14.y = 775/2;
        edge14.rotation = -59.5;
        edge14.scaleY = 1.65;
        this.addChild(edge14);

        // Красноярск-Тура
        let edge15 = _.cloneDeep(edgeContainer);
        edge15.x = 787/2;
        edge15.y = 775/2;
        edge15.rotation = 11.5;
        edge15.scaleY = 1.1;
        this.addChild(edge15);

        // Тура-Ханты-Мансийск
        let edge16 = _.cloneDeep(edgeContainer);
        edge16.x = 830/2;
        edge16.y = 575/2;
        edge16.rotation = -99;
        edge16.scaleY = 1.65;
        this.addChild(edge16);

        // Тура-Дудинка
        let edge17 = _.cloneDeep(edgeContainer);
        edge17.x = 830/2;
        edge17.y = 575/2;
        edge17.rotation = -50;
        edge17.scaleY = 0.9;
        this.addChild(edge17);

        // Дудинка-Сыктывкар
        let edge18 = _.cloneDeep(edgeContainer);
        edge18.x =351;
        edge18.y = 233;
        edge18.rotation = -90 - 11;
        edge18.scaleY = 1.88;
        this.addChild(edge18);

        // Дудинка-Ханты-Мансийск
        let edge19 = _.cloneDeep(edgeContainer);
        edge19.x =351;
        edge19.y = 233;
        edge19.rotation = -90 - 41;
        edge19.scaleY = 1.2;
        this.addChild(edge19);

        // Ханты-Мансийск-Сыктывкар
        let edge20 = _.cloneDeep(edgeContainer);
        edge20.x = 525/2;
        edge20.y = 621/2;
        edge20.rotation = -62;
        edge20.scaleY = 1;
        this.addChild(edge20);

        // Ханты-Мансийск-Омск
        let edge21 = _.cloneDeep(edgeContainer);
        edge21.x = 525/2;
        edge21.y = 621/2;
        edge21.rotation = 175;
        edge21.scaleY = 0.83;
        this.addChild(edge21);

        // Ханты-Мансийск-Барнаул
        let edge22 = _.cloneDeep(edgeContainer);
        edge22.x = 525/2;
        edge22.y = 621/2;
        edge22.rotation = 147.5;
        edge22.scaleY = 1.3;
        this.addChild(edge22);

        // Тура-Чита
        let edge23= _.cloneDeep(edgeContainer);
        edge23.x = 830/2;
        edge23.y = 575/2;
        edge23.rotation = 90 + 47;
        edge23.scaleY = 1.65;
        this.addChild(edge23);

        // Ханты-Мансийск-Пермь
        let edge24 = _.cloneDeep(edgeContainer);
        edge24.x = 525/2;
        edge24.y = 621/2;
        edge24.rotation = -98.5;
        edge24.scaleY = 0.8;
        this.addChild(edge24);

        // Омск-Пермь
        let edge25 = _.cloneDeep(edgeContainer);
        edge25.x = 270.5;
        edge25.y = 387;
        edge25.rotation = -51.5;
        edge25.scaleY = 1.15;
        this.addChild(edge25);

        // Омск-Барнаул
        let edge26 = _.cloneDeep(edgeContainer);
        edge26.x = 270.5;
        edge26.y = 387;
        edge26.rotation = 90 + 26.7;
        edge26.scaleY = 0.75;
        this.addChild(edge26);

        // Барнаул-Чита
        let edge27 = _.cloneDeep(edgeContainer);
        edge27.x = 663/2;
        edge27.y = 837/2;
        edge27.rotation = 90 - 4;
        edge27.scaleY = 2.05;
        this.addChild(edge27);

        // Сыктывкар-Пермь
        let edge28 = _.cloneDeep(edgeContainer);
        edge28.x = 358/2;
        edge28.y = 535/2;
        edge28.rotation = 180 - 8;
        edge28.scaleY = 0.6;
        this.addChild(edge28);

        // Сыктывкар-Архангельск
        let edge29 = _.cloneDeep(edgeContainer);
        edge29.x = 358/2;
        edge29.y = 535/2;
        edge29.rotation = -18.5;
        edge29.scaleY = 0.6;
        this.addChild(edge29);

        // Сыктывкар-Санкт-Петербург
        let edge30 = _.cloneDeep(edgeContainer);
        edge30.x = 358/2;
        edge30.y = 535/2;
        edge30.rotation = -60;
        edge30.scaleY = 1.1;
        this.addChild(edge30);

        // Сыктывкар-Москва
        let edge31 = _.cloneDeep(edgeContainer);
        edge31.x = 358/2;
        edge31.y = 535/2;
        edge31.rotation = -95.5;
        edge31.scaleY = 1.03;
        this.addChild(edge31);

        // Сыктывкар-Саратов
        let edge32 = _.cloneDeep(edgeContainer);
        edge32.x = 358/2;
        edge32.y = 535/2;
        edge32.rotation = -90 - 44;
        edge32.scaleY = 1.12;
        this.addChild(edge32);

        // Санкт-Петербург-Белгород
        let edge33 = _.cloneDeep(edgeContainer);
        edge33.x = 88.5;
        edge33.y = 215.5;
        edge33.rotation = -90 - 65;
        edge33.scaleY = 1.12;
        this.addChild(edge33);

        // Санкт-Петербург-Архангельск
        let edge34 = _.cloneDeep(edgeContainer);
        edge34.x = 88.5;
        edge34.y = 215.5;
        edge34.rotation = 90 - 1;
        edge34.scaleY = 0.76;
        this.addChild(edge34);

        // Санкт-Петербург-Москва
        let edge35 = _.cloneDeep(edgeContainer);
        edge35.x = 88.5;
        edge35.y = 215.5;
        edge35.rotation = -175;
        edge35.scaleY = 0.67;
        this.addChild(edge35);

        // Москва-Архангельск
        let edge36 = _.cloneDeep(edgeContainer);
        edge36.x = 84;
        edge36.y = 275.5;
        edge36.rotation = 52;
        edge36.scaleY = 1;
        this.addChild(edge36);

        // Москва-Белгород
        let edge37 = _.cloneDeep(edgeContainer);
        edge37.x = 84;
        edge37.y = 275.5;
        edge37.rotation = -90-42;
        edge37.scaleY =0.6;
        this.addChild(edge37);

        // Москва-Саратов
        let edge38 = _.cloneDeep(edgeContainer);
        edge38.x = 84;
        edge38.y = 275.5;
        edge38.rotation = 180 - 12;
        edge38.scaleY =0.75;
        this.addChild(edge38);

        // Москва-Пермь
        let edge39 = _.cloneDeep(edgeContainer);
        edge39.x = 84;
        edge39.y = 275.5;
        edge39.rotation = 90 + 24;
        edge39.scaleY =1.15;
        this.addChild(edge39);

        // Саратов-Оренбург
        let edge40 = _.cloneDeep(edgeContainer);
        edge40.x = 99.5;
        edge40.y = 344;
        edge40.rotation = 90 + 32;
        edge40.scaleY =0.65;
        this.addChild(edge40);

        // Саратов-Элиста
        let edge41 = _.cloneDeep(edgeContainer);
        edge41.x = 99.5;
        edge41.y = 344;
        edge41.rotation = -135;
        edge41.scaleY =0.65;
        this.addChild(edge41);

        // Саратов-Белгород
        let edge42 = _.cloneDeep(edgeContainer);
        edge42.x = 99.5;
        edge42.y = 344;
        edge42.rotation = -58.6;
        edge42.scaleY =0.65;
        this.addChild(edge42);

        // Саратов-Пермь
        let edge43 = _.cloneDeep(edgeContainer);
        edge43.x = 99.5;
        edge43.y = 344;
        edge43.rotation = 90 - 15;
        edge43.scaleY = 0.98;
        this.addChild(edge43);

        // Оренбург-Пермь
        let edge44 = _.cloneDeep(edgeContainer);
        edge44.x = 152.5;
        edge44.y = 375.5;
        edge44.rotation = 32;
        edge44.scaleY = 0.7;
        this.addChild(edge44);

        // Элиста-Белгород
        let edge45 = _.cloneDeep(edgeContainer);
        edge45.x = 115/2;
        edge45.y = 770/2;
        edge45.rotation = -11;
        edge45.scaleY =0.8;
        this.addChild(edge45);

        // Circle pattern
        let vFill1_mc = new createjs.Bitmap("prim/_resource/VFill1_mc.png");
        vFill1_mc.name = "VFill1_mc";
        vFill1_mc.regX = 4.5;
        vFill1_mc.regY = 4.5;
        let vFill2_mc = new createjs.Bitmap("prim/_resource/VFill2_mc.png");
        vFill2_mc.name = "VFill2_mc";
        vFill2_mc.regX = 4.5;
        vFill2_mc.regY = 4.5;
        let vFill3_mc = new createjs.Bitmap("prim/_resource/VFill3_mc.png");
        vFill3_mc.name = "VFill3_mc";
        vFill3_mc.regX = 4.5;
        vFill3_mc.regY = 4.5;
        let circleContainer = new createjs.Container();
        circleContainer.addChild(vFill1_mc);
        circleContainer.addChild(vFill2_mc);
        circleContainer.addChild(vFill3_mc);

        let anadyrCity = _.cloneDeep(circleContainer);
        anadyrCity.x = 681.5;
        anadyrCity.y = 69;
        this.addChild(anadyrCity);

        let dudinkaCity = _.cloneDeep(circleContainer);
        dudinkaCity.x = 351;
        dudinkaCity.y = 233;
        this.addChild(dudinkaCity);

        let saratovCity = _.cloneDeep(circleContainer);
        saratovCity.x = 99.5;
        saratovCity.y = 344;
        this.addChild(saratovCity);

        let saintPetersburgCity = _.cloneDeep(circleContainer);
        saintPetersburgCity.x = 88.5;
        saintPetersburgCity.y = 215.5;
        this.addChild(saintPetersburgCity);

        let permCity = _.cloneDeep(circleContainer);
        permCity.x = 187.5;
        permCity.y = 320.5;
        this.addChild(permCity);

        let orenburgCity = _.cloneDeep(circleContainer);
        orenburgCity.x = 152.5;
        orenburgCity.y = 375.5;
        this.addChild(orenburgCity);

        let omskCity = _.cloneDeep(circleContainer);
        omskCity.x = 270.5;
        omskCity.y = 387;
        this.addChild(omskCity);

        let moscowCity = _.cloneDeep(circleContainer);
        moscowCity.x = 84;
        moscowCity.y = 275.5;
        this.addChild(moscowCity);

        let magadanCity = _.cloneDeep(circleContainer);
        magadanCity.x = 1323/2;
        magadanCity.y = 411/2;
        this.addChild(magadanCity);

        let krasnoyarskCity = _.cloneDeep(circleContainer);
        krasnoyarskCity.x = 787/2;
        krasnoyarskCity.y = 775/2;
        this.addChild(krasnoyarskCity);

        let blagoveshchenskCity = _.cloneDeep(circleContainer);
        blagoveshchenskCity.x = 1243/2;
        blagoveshchenskCity.y = 762/2;
        this.addChild(blagoveshchenskCity);

        let belgorodCity = _.cloneDeep(circleContainer);
        belgorodCity.x = 87/2;
        belgorodCity.y = 622/2;
        this.addChild(belgorodCity);

        let barnaulCity = _.cloneDeep(circleContainer);
        barnaulCity.x = 663/2;
        barnaulCity.y = 837/2;
        this.addChild(barnaulCity);

        let arkhangelskCity = _.cloneDeep(circleContainer);
        arkhangelskCity.x = 321/2;
        arkhangelskCity.y = 429/2;
        this.addChild(arkhangelskCity);

        let yakutskCity = _.cloneDeep(circleContainer);
        yakutskCity.x = 1134/2;
        yakutskCity.y = 523/2;
        this.addChild(yakutskCity);

        let elistaCity = _.cloneDeep(circleContainer);
        elistaCity.x = 115/2;
        elistaCity.y = 770/2;
        this.addChild(elistaCity);

        let chitaCity = _.cloneDeep(circleContainer);
        chitaCity.x = 1051/2;
        chitaCity.y = 810/2;
        this.addChild(chitaCity);

        let turaCity = _.cloneDeep(circleContainer);
        turaCity.x = 830/2;
        turaCity.y = 575/2;
        this.addChild(turaCity);

        let khantyMansiyskCity = _.cloneDeep(circleContainer);
        khantyMansiyskCity.x = 525/2;
        khantyMansiyskCity.y = 621/2;
        this.addChild(khantyMansiyskCity);

        let syktyvkarCity = _.cloneDeep(circleContainer);
        syktyvkarCity.x = 358/2;
        syktyvkarCity.y = 535/2;
        this.addChild(syktyvkarCity);
    }
}
