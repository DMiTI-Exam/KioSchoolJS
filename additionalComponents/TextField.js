export class TextField {
    #backgroundColor;
    #border;
    #borderColor;
    #height;
    #multiline;
    #text;
    #textColor;
    #width;
    #wordWrap;
    #x;
    #y;

    #canvas;
    #input = null;
    #textFormat;

    constructor(canvas) {
        this.#canvas = canvas;

        this.#input = document.createElement('textarea');
        // this.#input.type = 'text';

        this.#input.style.display = 'block';
        this.#input.style.position = 'absolute';
        this.#input.style.left = canvas.offsetLeft + 'px';
        this.#input.style.top = canvas.offsetTop + 'px';
        this.#input.style.outline = 'none';
        this.#input.style.resize = 'none';

        document.body.appendChild(this.#input);
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
            this.#input.style.border = '1';
        } else {
            this.#input.style.border = 'none';
        }
    }

    getBorderColor() {
        return this.#borderColor;
    }

    setBorderColor(bgColor) {
        this.#borderColor = bgColor;
        this.#input.style.borderColor = bgColor;
    }

    getHeight() {
        return this.#height;
    }

    getHeight() {
        return this.#height;
    }

    setHeight(height) {
        this.#height = height;
        this.#input.style.height = height + 'px';
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

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = text;
        this.#input.value = text;
    }

    getTextColor() {
        return this.#textColor;
    }

    setTextColor(textColor) {
        this.#textColor = textColor;
        this.#input.style.color = textColor;
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
            this.#input.style.wordWrap = 'break-word';
        } else {
            this.#input.style.wordWrap = 'normal';
        }
    }

    getX() {
        return this.#x;
    }

    setX(x) {
        this.#x = x;
        this.#input.style.left = (x + this.#canvas.offsetLeft) + 'px';
    }

    getY() {
        return this.#y;
    }

    setY(y) {
        this.#y = y;
        this.#input.style.top = (y + this.#canvas.offsetTop) + 'px';
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

        // TODO: input haven't leading
        //this.#input.style.

        // TODO: left and right margins?
        //this.#input.style.
        //this.#input.style.

        this.#input.style.fontSize = textFormat.getSize() + 'px';

        // TODO: is target usable for us?
        //this.#input.style.

        if (textFormat.isUnderline()) {
            this.#input.style.textDecoration = 'underline';
        } else {
            this.#input.style.textDecoration = 'none';
        }

        // TODO: is url usable for us?
        //this.#input.style.
    }

    getLineWidth() {
        let font = this.#textFormat.getSize() + 'px ' + this.#textFormat.getFont();
        return createjs.Text(this.#text, font, this.#textColor).lineWidth;
    }
}