import { ILayoutable } from "./ILayoutable.js";
import { StringUtils } from "../../util/StringUtils.js";
import { TextField } from "../../../additionalComponents/TextField.js";

/**
 * Класс занимается расстановкой визуальных элементов в контейнере
 * Положение каждого дочернего компонента определяется относительными границами
 * Все числа нормализуются - т.е. 100 px будет 100 px независимо от масштабирования
 * и вложенности родительских компонентов.
 *
 * <code>
 * expr ::= item { op-add item } <br>
 * op-add ::= + | - <br>
 * item ::= factor { op-mul factor } <br>
 * op-mul ::= * | /  <br>
 * factor ::= digits | component | (expr) <br>
 * component ::= name.bound <br>
 * bound::=top|bottom|right|left|width|height <br>
 * digits ::= digit { digit }[r] <br>
 * digit ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 <br>
 * </code>
 */
export class ComponentLayout {
    /**
     * псевдоним контейнера - сцены
     */
    static CONTAINER_PSEUDONYM = "root";

    /**
     * Разделитель границ
     */
    static BOUND_DELIMITER = ';';

    /**
     * Цифры
     */
    static DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    /**
     * Операциии типа сложения - низший приоритет
     */
    static OPERATIONS_ADD = ['+', '-'];

    /**
     * Операции типа умножения - высший приоритет после скобок
     */
    static OPERATIONS_MUL = ['*', '/'];

    /**
     * Словарь конпонентов: название->конпонент
     */
    #componentNames = new Map();

    /**
     * Словарь относительных границ компонентов: названия компонента->относительные границы
     */
    #componentBounds = new Map();

    /**
     * Контейнер
     */
    #container;

    /**
     * Ширина контейнера
     */
    #rootWidth

    /**
     * Высота контернера
     */
    #rootHeight

    /**
     * Итоговый коэффициент масштабирования - произведение всех коэффициентов
     * от текущего контейнера до сцены
     */
    #scaleX = 1;

    /**
     * Итоговый коэффициент масштабирования - произведение всех коэффициентов
     * от текущего контейнера до сцены
     */
    #scaleY = 1;

    /**
     * Флаг, означающий, что происходит вычисление горизонтального измерения
     */
    #xdimension;

    /**
     * Флаг, означающий, что происходит компоновка текстового поля
     */
    #field;

    constructor(container, width=-1, height=-1) {
        this.#container = container;
        this.#componentNames.set(ComponentLayout.CONTAINER_PSEUDONYM, container);
        this.#rootWidth = width;
        this.#rootHeight = height;
    }

    /**
     * Добавляет компонент к контейнеру
     */
    addComponent(component, name, bounds) {
        this.#componentNames.set(name, component);
        this.#componentBounds.set(name, bounds);

        //если есть предустановленные размеры контейнера, их нельзя сломать
        //размер контейнера увеличивается при добавлении большого потомка
        let componentBounds = component.getBounds();
        if (this.#rootWidth !== -1) {
            if (componentBounds.width > this.#rootWidth) {
                component.setBounds(componentBounds.x, componentBounds.y, this.#rootWidth, componentBounds.height);
            }

            if (componentBounds.height > this.#rootHeight) {
                component.setBounds(componentBounds.x, componentBounds.y, componentBounds.width, this.#rootHeight);
            }
        }

        this.#container.addChild(component);
    }

    /**
     * Устанавливает границы компонентам в зависимости от размеров контейнера
     */
    layout() {
        let container = this.#container;
        if (container != null) {
            while (!(container instanceof createjs.Stage)) {
                this.#scaleX *= container.scaleX;
                this.#scaleY *= container.scaleY;
                container = container.parent;
            }
        }

        for (let key of this.#componentNames) {
            if (key === ComponentLayout.CONTAINER_PSEUDONYM) {
                continue;
            }

            let comp = this.#componentNames.get(key);
            let str = this.#componentBounds.get(key);
            if (str == null) {
                continue;
            }

            let sBounds = str.split(ComponentLayout.BOUND_DELIMITER);

            this.#xdimension = true;
            comp.getBounds().x = this._getValue(StringUtils.toArray(sBounds[0]));
            this.#xdimension = false;
            comp.getBounds().y = this._getValue(StringUtils.toArray(sBounds[1]));

            this.#field = comp instanceof createjs.Text || comp.name === "TextField";
            this.#xdimension = true;
            comp.getBounds().width = this._getValue(StringUtils.toArray(sBounds[2]));
            this.#xdimension = false;
            comp.getBounds().height = this._getValue(StringUtils.toArray(sBounds[3]));

            this.#field = false;

            //если элемент содержит менеджер компоновки - ресайзим его
            if (comp instanceof ILayoutable) {
                comp.getLayout().layout();
            }
        }
    }

    /**
     * Вычисление арифметического выражения
     */
    _getValue(sExpression) {
        let resultValue = this.#getItem(sExpression);
        while (sExpression.length > 0 && ComponentLayout.OPERATIONS_ADD.indexOf(sExpression[0]) !== -1) {
            let addOp = sExpression[0];
            sExpression.shift();
            let secondOp = this.#getItem(sExpression);
            if (addOp === '+') {
                resultValue += secondOp;
            } else if (addOp === '-') {
                resultValue -= secondOp;
            }
        }

        return resultValue;
    }

    /**
     * Вычисление слагаемого арифметического выражения
     */
    #getItem(sItem) {
        let resultValue = this.#getFactor(sItem);
        while (sItem.length > 0 && ComponentLayout.OPERATIONS_MUL.indexOf(sItem[0]) !== -1) {
            let mulOp = sItem[0];
            sItem.shift();
            let secondOp = this.#getFactor(sItem);
            if (mulOp === '*') {
                resultValue *= secondOp;
            } else if (mulOp === '/') {
                resultValue /= secondOp;
            }
        }

        return resultValue;
    }

    /**
     * Вычисление множителя арифметического выражения
     */
    #getFactor(sFactor) {
        if (ComponentLayout.DIGITS.indexOf(sFactor[0]) !== -1) {
            return this.#getNumber(sFactor);
        } else if (sFactor[0] === '(') {
            sFactor.shift();
            let resultValue = this._getValue(sFactor);
            sFactor.shift();
            return resultValue;
        }

        return this.#getComponentValue(sFactor);
    }

    /**
     * Разбор строкоого предсталения числа
     */
    #getNumber(sNumber) {
        let count = 0;
        while (count < sNumber.length && ComponentLayout.DIGITS.indexOf(sNumber[count]) !== -1) {
            count++;
        }

        let str1 = StringUtils.toString(sNumber.slice(0, count));
        for (let i = 0; i < count; i++) {
            sNumber.shift();
        }

        if (sNumber.length > 0 && sNumber[0] === 'r') {
            sNumber.shift();
            return parseInt(str1);
        } else {
            if (this.#xdimension) {
                return parseInt(str1)/this.#scaleX;
            } else {
                return parseInt(str1)/this.#scaleY;
            }
        }
    }

    /**
     * Получение значения границы компонента из строкового предсталения
     */
    #getComponentValue(sComponentBounds) {
        let count = 0;
        while (count < sComponentBounds.length &&
        (ComponentLayout.OPERATIONS_ADD.indexOf(sComponentBounds[count]) === -1) &&
        (ComponentLayout.OPERATIONS_MUL.indexOf(sComponentBounds[count]) === -1)) {
            count++;
        }

        let str1 = StringUtils.toString(sComponentBounds.slice(0, count));
        for (let i = 0; i < count; i++) {
            sComponentBounds.shift();
        }

        count = 0;
        while (str1.charAt(count) !== '.') {
            count++;
        }

        let sName = str1.substring(0, count);
        let sBound = str1.substring(count+1);
        let comp = this.#componentNames[sName];

        let scaleX = 1;
        let scaleY = 1;

        if (sName === "root") {
            scaleX = comp.scaleX;
            scaleY = comp.scaleY;
        }

        if (sBound === "top") {
            return comp.y/scaleY;
        } else if (sBound === "bottom") {
            return (comp.y + comp.getBounds().height)/scaleY;
        } else if (sBound === "right") {
            return (comp.x + comp.getBounds().width)/scaleX;
        } else if (sBound === "left") {
            return comp.x/scaleX;
        } else if (sBound === "width") {
            if (sName === "root" && this.#rootWidth !== -1) {
                return this.#rootWidth;
            } else {
                return comp.getBounds().width/scaleX;
            }
        } else if (sBound === "height") {
            if (sName === "root" && this.#rootHeight !== -1) {
                return this.#rootHeight;
            } else {
                return comp.getBounds().height/scaleY;
            }
        }

        return 0;
    }
}