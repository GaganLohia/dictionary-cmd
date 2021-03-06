import Services from "./services"
import Interactor from "./interactor"
import Printer from "./printer"

var printer = new Printer();
var ServicesController = new Services();
export default class Controller {
    constructor() {
        this.synonym = "synonym";
        this.antonym = "antonym";
        this.definations = "defination";
        this.examples = "example"
    }

    async showWordDefinations(word) {
        let res = await ServicesController.getWordDefinations(word);
        if (res.success) {
            var data = res.data.map(item => {
                return item.text;
            });
            this.print(this.definations, data);
            return true;
        } else {
            this.printLine(res.data);
            return false;
        }
    }

    async showWordSynonyms(word) {
        let res = await ServicesController.getRelatedWords(word)
        if (res.success) {
            let synonyms = this.formatRelatedWords(res, this.synonym);
            this.print(this.synonym, synonyms);
        } else {
            this.printLine(res.data);
        }
    }

    async showWordAntonyms(word) {
        let res = await ServicesController.getRelatedWords(word)
        if (res.success) {
            let antonyms = this.formatRelatedWords(res, this.antonym);
            this.print(this.antonym, antonyms);
        } else {
            this.printLine(res.data);
        }
    }

    async showFullDict(word) {
        let success = await this.showWordDefinations(word);
        if (success) {
            let relatedWords = await ServicesController.getRelatedWords(word);
            if (relatedWords.success) {
                let antonyms = this.formatRelatedWords(relatedWords, this.antonym);
                let synonyms = this.formatRelatedWords(relatedWords, this.synonym);
                this.print(this.synonym, synonyms);
                this.print(this.antonym, antonyms);
            } else {
                this.printLine(res.data);
            }
        }

    }

    async showRandomWordDict() {
        let res = await ServicesController.getRandomWord();
        if (res.success) {
            printer.printLine(`\n\nWord is: `.blue + res.data.green);
            await this.showFullDict(res.data);
        } else {
            this.printLine(res.data);
        }
    }

    async showExamples(word) {
        let res = await ServicesController.getExamples(word);
        if (res.success) {
            var data = res.data.map(item => {
                return item.text;
            });
            this.print(this.examples, data);
        } else {
            this.printLine(res.data);
        }
    }

    async playGame() {
        let { data } = await ServicesController.getRandomWord();
        let definationsRes = await ServicesController.getWordDefinations(data);
        var definations = definationsRes.data.map(item => {
            return item.text;
        });
        let relatedWords = await ServicesController.getRelatedWords(data);
        var antonyms = [], synonyms = [];
        if (relatedWords.success) {
            relatedWords.data.forEach(item => {
                if (item.relationshipType == "antonym") {
                    antonyms = item.words;
                } else if (item.relationshipType == "synonym") {
                    synonyms = item.words;
                }
            });
        }
        let interactor = new Interactor(data, definations, antonyms, synonyms);
        interactor.playGame();
    }

    formatRelatedWords(res, type) {
        var words = [];
        res.data.forEach(item => {
            if (item.relationshipType == type) {
                words = item.words;
            }
        });
        return words;
    }

    print(heading, data) {
        if (!data || data.length == 0) {
            printer.printLine(`\n\n${heading.capitalize()}s not found for this word!`.red);
            return;
        }
        printer.printLine(`\n\n${heading.capitalize()}s for this word are:`.blue);
        data.forEach((item, i) => {
            printer.printLine(`${i + 1}. ${item}`.green);
        });
    }

    printLine(str) {
        printer.printLine(`\n${str}`.red);
    }
}