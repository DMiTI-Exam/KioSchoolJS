import{ITextConsumer}from"../../ITextConsumer.js";export class CommentTextConsumer extends ITextConsumer{#textField;constructor(view){super();this.#textField=view}textSetter(comment){this.#textField.text=comment}}