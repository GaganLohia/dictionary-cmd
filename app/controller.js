import Services from "./services"
import Interactor from "./interactor"

var ServicesController = new Services();
export default class Controller {
    constructor() {
        this.synonyms = "synonym";
        this.antonyms = "antonym";
        this.definations = "defination";
    }

    async showWordDefinations(word) {
        let res = await ServicesController.getWordDefinations(word);
        if (res.success) {
            var data = res.data.map(item => {
                return item.text;
            });
            this.print(this.definations, data);
        } else {
            this.printLine(res.data);
        }
    }

    async showWordSynonyms(word) {
        let res = await ServicesController.getRelatedWords(word)
        if (res.success) {
            let synonyms = this.formatRelatedWords(res, this.synonyms);
            this.print(this.synonyms, synonyms);
        } else {
            this.printLine(res.data);
        }
    }

    async showWordAntonyms(word) {
        let res = await ServicesController.getRelatedWords(word)
        if (res.success) {
            let antonyms = this.formatRelatedWords(res, this.antonyms);
            this.print(this.antonyms, antonyms);
        } else {
            this.printLine(res.data);
        }
    }

    async showFullDict(word) {
        await this.showWordDefinations(word);
        let relatedWords = await ServicesController.getRelatedWords(word);
        if (relatedWords.success) {
            let antonyms = this.formatRelatedWords(relatedWords, this.antonyms);
            let synonyms = this.formatRelatedWords(relatedWords, this.synonyms);
            this.print(this.synonyms, synonyms);
            this.print(this.antonyms, antonyms);
        } else {
            this.printLine(res.data);
        }

    }

    async showRandomWordDict() {
        let res = await ServicesController.getRandomWord();
        if (res.success) {
            let word = res.data;
            console.log(`\n\nWord of the day is: ${word}`.yellow);
            await this.showWordDefinations(word);
            await this.showWordSynonyms(word);
            await this.showWordAntonyms(word);
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
        if (relatedWords.success) {
            let antonyms = this.formatRelatedWords(relatedWords, this.antonyms);
            let synonyms = this.formatRelatedWords(relatedWords, this.synonyms);
            console.log(data);
            console.log(definations);
            console.log(antonyms);
            console.log(synonyms);
            let interactor = new Interactor(data, definations, relatedWords, relatedWords);
            interactor.playGame();
        }

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
            console.log(`\n\n${heading.capitalize()}s not found for this word!`.red);
            return;
        }
        console.log(`\n\n${heading.capitalize()}s for this word are:`.blue);
        data.forEach((item, i) => {
            console.log(`${i + 1}. ${item}`.green);
        });
    }

    printLine(str) {
        console.log(`\n${str}`.red);
    }

}