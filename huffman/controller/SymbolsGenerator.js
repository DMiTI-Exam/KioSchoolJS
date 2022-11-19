export class SymbolsGenerator {
    static #words = ["allow", "alone", "also", "assist", "aunt", "dog", "able", "banana",
        "bees", "beef", "boat", "body", "book", "boss", "book", "buy", "bus", "cake", "came", "can", "car",
        "card", "cat", "cold"];

    constructor() {
        throw new Error("Cannot construct a singleton class");
    }

    static generateWords() {
        let firstWord;
        let secondWord;
        let uniqueLetters;

        do {
            firstWord = this.#words[Math.floor(Math.random() * this.#words.length)];
            secondWord = this.#words[Math.floor(Math.random() * this.#words.length)];
            uniqueLetters = SymbolsGenerator.#getArrayOfUniqueLetters(firstWord, secondWord);
        } while (firstWord === secondWord || uniqueLetters.length > 6);

        return {
            "first": firstWord,
            "second": secondWord,
            "letters": uniqueLetters
        };
    }

    static #getArrayOfUniqueLetters(firstWord, secondWord) {
        let uniqueLetters = [];
        SymbolsGenerator.#addUniqueLetters(firstWord, uniqueLetters);
        SymbolsGenerator.#addUniqueLetters(secondWord, uniqueLetters);
        return uniqueLetters;
    }

    static #addUniqueLetters(word, uniqueLetters) {
        for (let i = 0; i < word.length; i++) {
            if (uniqueLetters.indexOf(word.charAt(i)) < 0) {
                uniqueLetters.push(word.charAt(i));
            }
        }
    }
}