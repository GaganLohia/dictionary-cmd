import Services from "./services"

var ServicesController = new Services();
export default class Controller{
    constructor(){}

    showWordDefinations(word){
        ServicesController.getWordDefinations(word)
                    .then(res=>console.log(res));
    }

    showWordSynonyms(word){
        ServicesController.getRelatedWords(word)
                    .then(res=>console.log(res));
    }

    showWordAntonyms(word){
        ServicesController.getRelatedWords(word)
                    .then(res=>console.log(res));
    }

    showFullDict(word){
        
    }

}