export class TextField {
    static #cachedInputs = new Map();

    /**
     * Defines filling for background textarea color in hex format ("#000000")
     */
    #backgroundColor;

    /**
     * Defines, whether the textarea have a border
     */
    #border;

    /**
     * Sets color for textarea border in hex format ("#000000")
     */
    #borderColor;

    #glow;

    /**
     * Textarea height in pixels
     */
    #height;

    /**
     * Defines, how much chars you will be able to enter to the textarea
     */
    #maxChars;

    /**
     * Defines, whether you can use multiple lines for inputting text
     */
    #multiline;

    /**
     * Can be scroll or hidden by horizontally
     */
    #overflowX;

    /**
     * Can be scroll or hidden by vertically
     */
    #overflowY;

    /**
     * Restriction pattern, must contain symbols, that can be inputted to the textarea.
     * For example: "0-9" or "0-9A-Z_ !" and so on
     */
    #pattern;

    /**
     * Defines, whether the textarea can be selected and whether text can be copied, pasted or cut
     */
    #selectable;

    /**
     * Inner text in the textarea
     */
    #text;

    /**
     * May be "input" for changeable or "dynamic" for immutable textarea
     */
    #type;

    /**
     * Color for the text entered to the textarea in hex format ("#000000")
     */
    #textColor;

    /**
     * Defines, whether the textarea will be visible
     */
    #visible;

    /**
     * Textarea width in pixels
     */
    #width;

    /**
     * Defines, whether the text can be wrapped if the textarea line overflows or scrolls instead
     */
    #wordWrap;

    /**
     * x coordinate relatively createjs element (0, 0) position
     */
    #x;

    /**
     * y coordinate relatively createjs element (0, 0) position
     */
    #y;

    #createJsElement;
    #input = null;

    /**
     * TextFormat class, contains additional attributes such as font, bold flag and so on
     */
    #textFormat;

    constructor(createJsElement, name = "TextField") {
        this.#createJsElement = createJsElement;
        this.#createJsElement.name = name;

        this.#input = document.createElement('textarea');
        this.#input.style.position = 'absolute';
        this.#input.style.left = 0 + 'px';
        this.#input.style.top = 0 + 'px';
        this.#input.style.outline = 'none';
        this.#input.style.resize = 'none';
        this.#input.style.background = 'transparent';
        this.#input.style.border = '1px solid';
        this.#input.style.borderColor = 'transparent';
        this.#input.style.display = 'block';

        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.appendChild(this.#input);

        createJsElement.on("added", function (event) {
            div.style.left = createJsElement.x + 'px';
            div.style.top = createJsElement.y + 'px';
            document.body.appendChild(div);
        });

        if (TextField.#cachedInputs.get(name) == null) {
            TextField.#cachedInputs.set(name, []);
        }

        TextField.#cachedInputs.get(name).push(this);
    }

    getBackgroundColor() {
        return this.#backgroundColor;
    }

    setBackgroundColor(bgColor) {
        this.#backgroundColor = bgColor;
        this.#input.style.backgroundColor = bgColor;
    }

    getBorder() {
        return this.#border;
    }

    setBorder(hasBorder) {
        this.#border = hasBorder;
        if (hasBorder) {
            this.#input.style.borderColor = 'black';
            this.#input.style.borderColor = this.#borderColor;
        } else {
            this.#input.style.borderColor = 'transparent';
        }
    }

    getBorderColor() {
        return this.#borderColor;
    }

    setBorderColor(bgColor) {
        this.#borderColor = bgColor;
        this.#input.style.borderColor = bgColor;
    }

    getGlow() {
        return this.#glow;
    }

    setGlow(enable, x, y, blur, color, contrast) {
        if (enable) {
            let startGlow = x + 'px ' + y + 'px ' + blur + 'px ' + color;
            this.#glow = startGlow;
            for (let i = 0; i < contrast - 1; ++i) {
                this.#glow += ', ' + startGlow;
            }

            this.#input.style.textShadow = this.#glow;
        } else {
            this.#glow = 'none';
            this.#input.style.textShadow = this.#glow;
        }
    }

    getHeight() {
        return this.#height;
    }

    setHeight(height) {
        this.#height = height;
        this.#input.style.height = height + 'px';
    }

    getMaxChars() {
        return this.#maxChars;
    }

    setMaxChars(maxChars) {
        this.#maxChars = maxChars;
        this.#input.maxLength = maxChars;
    }

    isMultiline() {
        return this.#multiline;
    }

    setMultiline(isMultiline) {
        this.#multiline = isMultiline;
        if (isMultiline) {
            this.#input.style.whiteSpace = 'normal';
        } else {
            this.#input.style.whiteSpace = 'nowrap';
        }
    }

    getOverflowX() {
        return this.#overflowX;
    }

    hideOnOverflowX(needHide) {
        if (needHide) {
            this.#overflowX = 'hidden';
            this.#input.style.overflowX = 'hidden';
        } else {
            this.#overflowX = 'scroll';
            this.#input.style.overflowX = 'scroll';
        }
    }

    getOverflowY() {
        return this.#overflowY;
    }

    hideOnOverflowY(needHide) {
        if (needHide) {
            this.#overflowY = 'hidden';
            this.#input.style.overflowY = 'hidden';
        } else {
            this.#overflowX = 'scroll';
            this.#input.style.overflowY = 'scroll';
        }
    }

    getPattern() {
        return this.#pattern;
    }

    setPattern(pattern) {
        this.#pattern = pattern;

        this.addEventListener("keypress", function (e) {
            let regex = new RegExp("^[" + pattern + "]+$");
            const keyPressed = e.key;
            if (!regex.test(keyPressed)) {
                e.preventDefault();
            }
        });
    }

    isSelectable() {
        return this.#selectable;
    }

    setSelectable(isSelectable) {
        this.#selectable = isSelectable;

        if (isSelectable) {
            this.#input.style.cursor = 'text';
            this.#input.removeEventListener("select", this.#removeSelection);
            this.#input.removeEventListener("cut", this.#preventDefault);
            this.#input.removeEventListener("copy", this.#preventDefault);
            this.#input.removeEventListener("paste", this.#preventDefault);
        } else {
            this.#input.style.cursor = 'default';
            this.addEventListener("select", this.#removeSelection);
            this.addEventListener("cut", this.#preventDefault);
            this.addEventListener("copy", this.#preventDefault);
            this.addEventListener("paste", this.#preventDefault);
        }
    }

    #removeSelection() {
        window.getSelection().removeAllRanges();
    }

    #preventDefault(e) {
        e.preventDefault();
    }

    getText() {
        return this.#input.value;
    }

    setText(text) {
        this.#text = text;
        this.#input.value = text;
    }

    getType() {
        return this.#type;
    }

    setType(type) {
        this.#type = type;
        if (type === "input") {
            this.#input.removeAttribute("readOnly");
        } else if (type === "dynamic") {
            this.#input.readOnly = "true";
        }
    }

    getTextColor() {
        return this.#textColor;
    }

    setTextColor(textColor) {
        this.#textColor = textColor;
        this.#input.style.color = textColor;
    }

    isVisible() {
        return this.#visible;
    }

    setVisible(isVisible) {
        this.#visible = isVisible;
        if (isVisible) {
            this.#input.style.display = "block";
        } else {
            this.#input.style.display = "none";
        }
    }

    getWidth() {
        return this.#width;
    }

    setWidth(width) {
        this.#width = width;
        this.#input.style.width = width + 'px';
    }

    isWordWrap() {
        return this.#wordWrap;
    }

    setWordWrap(isWordWrap) {
        this.#wordWrap = isWordWrap;
        if (isWordWrap) {
            this.#input.style.whiteSpace = 'normal';
        } else {
            this.#input.style.whiteSpace = 'nowrap';
        }
    }

    getX() {
        return this.#x;
    }

    setX(x) {
        this.#x = x;
        this.#input.style.left = (x + this.#createJsElement.x) + 'px';
    }

    getY() {
        return this.#y;
    }

    setY(y) {
        this.#y = y;
        this.#input.style.top = (y + this.#createJsElement.y) + 'px';
    }

    getTextFormat() {
        return this.#textFormat;
    }

    setTextFormat(textFormat) {
        this.#textFormat = textFormat;

        this.#input.style.textAlign = textFormat.getAlign();

        if (textFormat.isBold()) {
            this.#input.style.fontWeight = 'bold';
        } else {
            this.#input.style.fontWeight = 'normal';
        }

        this.#input.style.color = textFormat.getColor();
        this.#input.style.fontFamily = textFormat.getFont();
        this.#input.style.textIndent = textFormat.getIndent() + 'px';

        if (textFormat.isItalic()) {
            this.#input.style.fontStyle = 'italic';
        } else {
            this.#input.style.fontStyle = 'normal';
        }

        this.#input.style.lineHeight = textFormat.getLeading() + 'px';

        this.#input.style.fontSize = textFormat.getSize() + 'px';

        if (textFormat.isUnderline()) {
            this.#input.style.textDecoration = 'underline';
        } else {
            this.#input.style.textDecoration = 'none';
        }
    }

    getLineWidth() {
        let font = this.#textFormat.getSize() + 'px ' + this.#textFormat.getFont();
        return createjs.Text(this.#text, font, this.#textColor).lineWidth;
    }

    addEventListener(eventName, callFunction) {
        this.#input.addEventListener(eventName, callFunction);
    }

    removeEventListener(eventName, callFunction) {
        this.#input.removeEventListener(eventName, callFunction);
    }

    static removeInputsByName(name) {
        if (TextField.#cachedInputs.get(name) == null) {
            return;
        }

        TextField.#cachedInputs.get(name).forEach(item => item.#input.remove());
        TextField.#cachedInputs.set(name, []);
    }

    static hideVisible() {
        for (let key of TextField.#cachedInputs.keys()) {
            TextField.#cachedInputs.get(key).forEach(item => {
                if (item.#input.style.display === 'block') {
                    item.#input.style.visibility = 'hidden';
                }
            });
        }
    }

    static showHidden() {
        for (let key of TextField.#cachedInputs.keys()) {
            TextField.#cachedInputs.get(key).forEach(item => {
                if (item.#input.style.display === 'block') {
                    item.#input.style.visibility = 'visible';
                }
            });
        }
    }

    static hideByName(name) {
        if (TextField.#cachedInputs.get(name) == null) {
            return;
        }

        TextField.#cachedInputs.get(name).forEach(item =>
            item.#input.style.visibility = 'hidden');
    }

    static showByName(name) {
        if (TextField.#cachedInputs.get(name) == null) {
            return;
        }

        TextField.#cachedInputs.get(name).forEach(item =>
            item.#input.style.visibility = 'visible');
    }
}