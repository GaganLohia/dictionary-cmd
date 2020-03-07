import { prompt, Select } from "inquirer"
import colour from "colors";
export default class Interactor {
    constructor(word, definations, antonym, synonym) {
        this.word = word;
        this.definations = definations;
        this.antonym = antonym;
        this.synonym = synonym;
        this.firstStatement = '\nGuess the word: '.blue;
        this.choices = ['1. Try again','2. Give a hint','3. Quit'];
     }
    
    async playGame() {
        while(true){
            let ans = await this.promptQuestion(this.firstStatement);
            if(ans.answer == this.word){
                console.log("\nYou won the game!!!".green);
                break;
            }else{
                this.firstStatement = 'Guess the word again: '.blue
                let ans = await this.promtOptions();
                let choice = this.choices.indexOf(ans.answer);
                if(choice == 1){
                    console.log("Hint");
                }else if(choice == 2){
                    break;
                }
            }
        }
    }

    async promptQuestion(question){
        const questionObj = {
            type: 'input',
            name: 'answer',
            message: question
        };
        return await prompt(questionObj);
    }

    async promtOptions(){
        const questionObj = {
            type: 'list',
            name: 'answer',
            message: '\nPlease choose one: ',
            choices: this.choices
        };
        return await prompt(questionObj);
    }
}