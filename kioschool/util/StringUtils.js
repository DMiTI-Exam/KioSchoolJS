import{TextField}from"../../additionalComponents/TextField.js";export class StringUtils{static toArray(string){let inArray=[];for(let c=0;c<string.length;c++){inArray.push(string.substr(c,1))}return inArray}static toString(array){let str="";for(let c=0;c<array.length;c++){str+=array[c]}return str}static toMultilineBySymbols(input,width,textFormat){let view=new TextField(new createjs.Container);view.setWidth(width);let result="";let source=StringUtils.toArray(input);let line="";let symbol="";while(source.length>0){symbol=source[0];source.shift();view.setText(line+symbol);view.setTextFormat(textFormat);if(view.getLineWidth()<view.getWidth()){line=line+symbol}else{result+=line+"\n";line=symbol}}result+=line;return result}static toMultiline(input,width,textFormat){let view=new TextField(new createjs.Container);view.setWidth(width);let result="";let source=StringUtils.toArray(input);let line="";let word="";while(source.length>0){word="";do{word+=source[0];source.shift()}while(word.charAt(word.length-1)!==" "&&source.length!==0);view.setText(line+word);view.setTextFormat(textFormat);if(view.getLineWidth()<view.getWidth()){line=line+word}else{result+=line+"\n";line=word}}result+=line;return result}}