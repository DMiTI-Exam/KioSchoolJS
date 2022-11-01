/**
 * See documentation on adobe: https://help.adobe.com/ru_RU/FlashPlatform/reference/actionscript/3/flash/text/TextFormat.html#methodSummary
 */
export class TextFormat {
    #align = "left";
    #bold = false;
    #color = "#000000";
    #font = "Times New Roman";
    #indent = 0;
    #italic = false;
    #leading = 0;
    #size = 12;
    #underline = false;

    constructor(font = null, size = null, color = null, bold = null, italic = null,
                underline = null, align = null, indent = null, leading = null) {
        if (align != null) {
            this.#align = align;
        }

        if (bold != null) {
            this.#bold = bold;
        }

        if (color != null) {
            this.#color = color;
        }

        if (font != null) {
            this.#font = font;
        }

        if (indent != null) {
            this.#indent = indent;
        }

        if (italic != null) {
            this.#italic = italic;
        }

        if (leading != null) {
            this.#leading = leading;
        } else {
            this.#leading = -1;
        }

        if (size != null) {
            this.#size = size;
        }

        if (underline != null) {
            this.#underline = underline;
        }
    }

    getAlign() {
        return this.#align;
    }

    setAlign(align) {
        this.#align = align;
    }

    isBold() {
        return this.#bold;
    }

    setBold(bold) {
        this.#bold = bold;
    }

    getColor() {
        return this.#color;
    }

    setColor(color) {
        this.#color = color;
    }

    getFont() {
        return this.#font;
    }

    setFont(font) {
        this.#font = font;
    }

    getIndent() {
        return this.#indent;
    }

    setIndent(indent) {
        this.#indent = indent;
    }

    isItalic() {
        return this.#italic;
    }

    setItalic(italic) {
        this.#italic = italic;
    }

    getLeading() {
        return this.#leading;
    }

    setLeading(leading) {
        this.#leading = leading;
    }

    getSize() {
        return this.#size;
    }

    setSize(size) {
        this.#size = size;
    }

    isUnderline() {
        return this.#underline;
    }

    setUnderline(underline) {
        this.#underline = underline;
    }
}