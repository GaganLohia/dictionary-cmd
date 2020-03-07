import Services from "./services"
import Interactor from "./interactor"

var ServicesController = new Services();
export default class Controller{
    constructor(){}

    async showWordDefinations(word){
        let res = await ServicesController.getWordDefinations(word);
        console.log(res);
    }

    async showWordSynonyms(word){
        let res = await ServicesController.getRelatedWords(word)
        console.log(res);
    }

    async showWordAntonyms(word){
        let res = await ServicesController.getRelatedWords(word)
        console.log(res);
    }

    async showFullDict(word){
        await this.showWordDefinations(word);
        await this.showWordSynonyms(word);
        await this.showWordAntonyms(word);
    }

    async showRandomWordDict(){
        let word = await ServicesController.getRandomWord();
        await this.showWordDefinations(word);
        await this.showWordSynonyms(word);
        await this.showWordAntonyms(word);
    }

    async playGame(){
        let {data} = await ServicesController.getRandomWord();
        let definations = await ServicesController.getWordDefinations(data);
        let relatedWords = await ServicesController.getRelatedWords(data);
        console.log(data);
        console.log(definations);
        console.log(relatedWords);
        let interactor = new Interactor(data,definations,relatedWords,relatedWords);
        interactor.playGame();
    }

}