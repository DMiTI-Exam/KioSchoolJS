# Kioschool

## About

This project represents rewriting resource from flash (ActionScript) to JavaScript for 
browser compatibility.

## Requirements

*   You must end each statement with **;** according to developers community.
*   You always must use **{ }** even if for, while or if constructions have 1 statement to execute.
*   ***import { module } from "path/to/module.js"*** - spaces in { } and the module must ending with .js.
*   The "export" keyword must be followed by all classes declarations for correct import using.
*   In ActionScript code you can see that some class field names starts with **_**. Unlike JS, flash have access modifiers.
Hence, in flash you can use the protected modifier with a field declaration, but JS haven't keywords for modifiers.
Instead of it uses **#**, **_** symbols before the field name. ***#field*** - private field, ***_field*** - protected field and simple 
***field*** - public field. Thus, don't migrate the variable name _var as _var to JS!
*   When you declare fields with document comments or static constants or fields, leave them between empty lines:
    ```js
    static CONSTANT_1 = 5;
    
    static staticField;
    
    static staticField2;
    
    /**
     *  This is the static field
     */
    static staticField3;
    
    #field1;
    #field2;
    
    /**
     *  This is private field
     */
    #field3;
    
    #field4;
    #field5;
    ```
*   flash.utils.Dictionary is changing to Map() class in JS. For setting and getting you have to use ***.get(...)*** and ***.set()***
methods in the ***Map*** class. Don't work with ***Map*** as arrays.
*   ***Array***, ***Vector*** and, maybe, another such objects in flash is changing to simple ***[]*** in JS. Variable initialized with
***[]*** has ***.push()***, ***.pop()*** and other similar methods.
*   When you write class, please, keep the next order definition rules:
    *   First of all, declare static constant;
    *   Secondly, declare static fields;
    *   Thirdly, private fields;
    *   Fourthly, constructors;
    *   Fifthly, define static and non-static methods.
*   Next flash function:
    ```actionscript3
    function get regime():int {...}
    function set regime(newRegime:int):void {...}
    
    var currentRegime:int = regime; // called get regime function
    regime = 5; // called set regime function
    ```
    Must be changed to:
    ```js
    regimeGetter() {
        ...
    }
    
    regimeSetter(newRegime) {
        ...
    }
    
    let currentRegime = regimeGetter();
    regimeSetter(5);
    ```
    **Importantly: migrate function get/set <name> as <name>Getter/Setter in order to distinguish them from another get/set<name>
    methods!**
    
    Whenever you face to usage simple variables such as regime = 5 and so on, you
    must check on set or get functions because they can have complex logic rather than simple
    returning a class field.
*   In JS all field or method calls must be started with ***this.*** . When you want to use private/protected field, you
have to use following syntax: ***this.#privateField*** or ***this._protectedField*** or ***this.publicField***. As for methods, correspondingly
***this.#privateMethod(arg)***, ***this._protectedMethod(arg)*** and ***this.publicMethod(arg)***.
*   When you check object on ***null***, use ***==*** or ***!=*** operators. In another cases use ***===*** or ***!==*** to check on types additionally.

## Advices to tricky moments

*   In flash the constructor name same as the class name and haven't return type:
    ```actionscript3
    public class SomeClass {
        public function SomeClass(arg) {
            // ...
        }
    }
    ```
    In JS constructor is ***constructor()***:
    ```js
    class SomeClass {
        constructor(arg) {
            // ...
        }
    }
    ```
    JS has not private constructors, to do it, see the next point.
*   Usage of singleton GoF pattern: in flash you can see private class passed to the singleton
class constructor. However, this way isn't valid. You can see an example in the ***CommentManager.js***
class. When you face to a singleton class, please, follow the next steps:
    *   Create private static fields, one for instance and another for specify whether this class be constructed directly:
        ```js
        static #instance;
        
        static #canConstruct = false;
        ```
    *   Then create getInstance method using the next pattern:
        ```js
        static instanceGetter() {
            if (CommentManager.#instance == null) {
                CommentManager.#canConstruct = true;
                CommentManager.#instance = new CommentManager();
                CommentManager.#canConstruct = false;
            }
    
            return this.#instance;
        }
        ```
    *   Finally, the last step, specify the constructor with the next pattern:
        ```js
        constructor() {
            if (!CommentManager.#canConstruct) {
                throw new Error("Cannot construct a singleton class");
            } else {
                // another logic
            }
        }
        ```
*   When you face to interfaces in flash code, be aware of absence of interfaces in JS. The following example help you to 
get rid of this problem:
    ```actionscript3
    public interface SomeInterface extends AnotherInterface {
        function method(arg:int):void;
    }
    ```
    ```js
    class SomeInterface extends AnotherInterface {
        constructor() {
            super();
    
            if (this.constructor === SomeInterface) {
                throw new Error("Abstract class can't be instantiated");
            }
        }
        
        method(arg) {
            throw new Error("Abstract method: must be overridden in a subclass");
        }
    }
    ```
    Please, don't change or use another error message in your code.
*   When you see in ActionScript code something like this: extends Sprite, extends MovieClip, etc. You need to
examine more about entity before doing changes. You can read about differences between Sprite, MovieClip in 
flash and createjs below in the next sections. This is the general advices:
    *   Both the flash ***Shape*** and ***MovieClip*** objects extends ***DisplayObjectContainer*** => is better to extends exactly 
    ***createjs.Container*** and call ***this.addChild()*** with ***Shape*** or something else in a constructor. But if you will need to 
    call property on a source object, just call ***getChildAt(0)*** to get it (if you have more than one object in the container
    try to calculate the index).
    *   If your flash class extends ***Sprite*** and besides, for example, implements one interface => you can think about
    extending this interface (class in JS) from ***createjs.Container***, but this is not always applicable, consult with
    the project architect. 
    
        Source flash code:
        ```actionscript3
        public class A extends Shape implements View {
            //...
        }
        ```
        Migrated to JS:
        ```js
        class A extends View {
        }
        
        class View extends createjs.Container {
        }
        ```
    *   **There is the most applicable solution for classes that implements several interfaces and extends a class (also 
    they can extend a class and implements exactly one interface and another variants): just add the *additionalInterfaces*
    package to your module and define your own interface (with an appropriate name) that combines two or more another 
    interface methods. Why this works? Since interfaces can't define a logic of the methods, and you change one interface 
    to them combinations, it won't reflect to your class logic, simply appears new additional abstract methods.**
    *   If your flash class extends ***SimpleButton***, you also need to extend ***createjs.Container***, but wrap the button to 
    ***createjs.HelpButton*** class (you can get the wrapped object with ***target*** property). It allows with little force add 
    listeners to buttons. Don't use the enabled property with complex logic (if you insert it into the ***selectButton*** method
    of the ***DefaultRegimeButtons*** class, it breaks buttons), but if you want to use it, don't forget call the ***gotoAndPlay("source")***
    method for returning to the source animation. Note, that to use the ***mouseEnabled*** and ***visible*** properties, 
    you need to call them from ***DisplayObject*** (***Sprite*** and so on):
        ```js
        class SomeButton extends createjs.Container {
            someButtonHelper;
        
            constructor() {
                super();
        
                let someButtonSheet = new createjs.SpriteSheet({
                    // create sprite sheet
                });
        
                let someButton = new createjs.Sprite(someButtonSheet, "<source animation>");
                this.someButtonHelper = new createjs.ButtonHelper(someButton,
                    "<rollout animation>", "<rollover animation>", "<mousedown animation>", 
                     <need gotoAndPlay method>, <hit area>, "<on hit animation>");
        
                this.addChild(someButton);
            }
        }
        ```
*   When you face to ***is*** keyword in flash, you need to use the ***instanceof*** operator in JS. But be aware of that 
***instanceof*** operator checks inheritance relation, and not only type. For example:
    ```js
    class A {
    }
    
    class B extends A {
    }
    
    A a = new A();
    B b = new B();
    
    console.log(b instanceof a); // returns true
    ```
    Be carefully with using this operator. Also there is a ***typeof*** operator, but ***typeof(A)*** returns object and this doing
    it useless.
*   JS doesn't support type casting between classes and in 99% cases it's not necessary. If you have an urgent need, 
maybe you are doing something wrong, consult with the project architect.
*   This project have ***additionalComponent*** package, which contains the self-written ***TextField*** component, and it is placed to the
document after placing corresponding createjs element. Contrasted with the ***createjs.Text*** class, adhere to the following
rules:
    *   If you see, that a text created as ***TextField*** in flash doesn't change, use ***createjs.Text*** for this purpose.
    *   If you need to dynamically change the text, use the custom ***TextField*** from the ***additionalComponent*** package
        because it can be editable contrasting with the ***createjs.Text*** class.
    *   Please, don't mix both classes. If you have already applied the ***TextField*** from the ***additionComponent*** package,
        keep using it.
    *   ***createjs.Text*** may be very useful for gui package classes.
    
    When you create ***TextField*** class, you have to pass ***createjs.Container*** to it. The ***TextField*** will appear 
    in a browser page only after setting parent to this container. Second argument (if you don't pass it, "TextField" by default)
    is an alias of the current createjs element and text field. It will be cached and in further you will be able to use
    ***removeInputsByName*** method for delete unusable text fields from a document by name (for example, when you need to clear current
    stage and init it from the beginning).
    
    **Please, check after switching pages (from a demo view to a help or if the demo view have text fields with filled numbers, and you
    reset the current state) that all text fields are invisible (don't remain visible where it's not needed). For hiding/showing the 
    currently visible text fields you can use the *TextField.hideVisible* and *TextField.showHidden* static methods without deletion.**
    
    ***TextField*** only uses getters/setters for properties, it doesn't provide them directly, unlike the ***createjs.Text***.
    Some properties can be different unlike flash, for example, ***tf.restrict = "0-9";*** can be replaced to ***tf.setPattern("0-9");***.
    For specify another moments, please go to the class definition and look through field's documented comments.
*   If you need to call the method from a context that hides ***this*** reference (such as ***EventListener***), use the next hack:
    ```js
    let self = this;
    
    this.#buttons.next_btn.addEventListener("click", function (event) {
        // ...
        self.updateButtons();
    });
    ```
*   If you need to get ***width*** or ***height*** from ***createjs.Container*** or ***createjs.DisplayObject*** classes, they
haven't these properties, but have ***getBounds()*** method which has ***width***, ***height***, ***x*** and ***y*** properties.
You need to call this:
    ```js
    let containerWidth = container.getBounds().width;
    ```
    However, ***x*** and ***y*** you have to get directly from ***createjs.Container*** or ***createjs.DisplayObject*** classes.
*   ***for (var i:int ...)*** replaces with ***for (let i = 0; ...)*** - an int variable is declared 0 by default.
*   For cycle through collection in flash:
    ```actionscript3
    for each(var cell:ChessCell in _listOfCells) {
        // ...
    }
    ```
    For cycle through collection in JS:
    ```js
    for (let cell of this.#listOfCells) {
        // ...
    }
    ```
    ***In*** must be changed to ***of***.

## Difference between base classes in Flash and createjs

There is a large amount of objects in ***flash.display*** package. Some basic of them: ***Bitmap***, ***DisplayObject***, 
***DisplayObjectContainer***, ***Graphics***, ***MovieClip***, ***Shape***, ***SimpleButton***, ***Sprite***, ***Stage***.

Some of these classes we can roughly associate with corresponding classes in createjs:

Flash | createjs |
:---: | :---:    |
Bitmap | Bitmap |
DisplayObject | DisplayObject |
DisplayObjectContainer | Container |
Graphics | Graphics |
Stage | Stage |

Hence we don't consider above classes. Also we don't consider ***SimpleButton*** (in a previous section we discuss how to
replace a ***SimpleButton*** object to createjs).

Classes | Flash description | Createjs description |
:---:   | :---:             | :---:                |
MovieClip | extends Sprite, so all of the below are true and you also get methods/properties associated with timeline control (that is, a Sprite with the ability to use frames). | associates a TweenJS Timeline with an EaselJS Container. It allows you to create objects which encapsulate timeline animations, state changes, and synched actions. |
Shape | is the simplest display object you can add on stage. It is the most limited one: you can't add children to it (does not extend DisplayObjectContainer), does not have interactivity (does not extend InteractiveObject), does not have a timeline. | A Shape allows you to display vector art in the display list. It composites a Graphics instance which exposes all of the vector drawing methods. |
SpriteSheet | - | Encapsulates the properties and methods associated with a sprite sheet. A sprite sheet is a series of images (usually animation frames) combined into a larger image (or images). For example, an animation consisting of eight 100x100 images could be combined into a single 400x200 sprite sheet (4 frames across by 2 high). |
Sprite | extends DisplayObjectContainer and InteractiveObject, therefore it's interactive and you can add children to it. It's the most useful display class, as long as you don't need a timeline. | Displays a frame or sequence of frames (ie. an animation) from a SpriteSheet instance. |

Comparing this classes, note that all are differ to some extent. ***Shape*** and ***SpriteSheet*** are inextricably linked and represents
series of images and extends directly from ***DisplayObject***, not ***Container***. In flash ***Sprite*** is a basic display object with
another purpose. 

***Shapes*** are also different, in flash is the most restricted class, but in createjs is the basic
display object as ***Sprite*** in flash.

All the ***Shape*** and ***Sprite*** can be interactive (mouse usage, events, etc) in createjs, but in the flash only ***Sprite***.

***MovieClip*** extends ***Sprite*** in flash, but in createjs it encapsulates the ***Tween*** object, therefore you cannot use ***Graphics*** 
on it, constructor takes labels with animation names containing numeric values - frames to jump to when calling one or 
another animation.

## Done modules
- [ ] Assignment
- [ ] Dijkstra
- [ ] Euler
- [X] Horse
- [ ] Huffman
- [X] Kioschool (core)
- [ ] Kruskal
- [ ] Lpca
- [ ] Matching
- [ ] Prim