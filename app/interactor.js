import { prompt } from "inquirer"
import colour from "colors";
import Printer from "./printer"
import Controller from "./controller"



var printer = new Printer();
export default class Interactor {
    constructor(word, definations, antonym, synonym) {
        this.word = word;
        this.definations = definations;
        this.antonym = antonym;
        this.synonym = synonym;
        this.originalSynonym = synonym;
        this.firstStatement = '\n\nPlease guess the word: ';
        this.choices = ['1. Try again','2. Give a hint','3. Quit'];
     }
    
    
    async playGame() {
        this.printDefination();
        this.printSynonym();
        this.printAntonym();
        while(true){
            let ans = await this.promptQuestion(this.firstStatement);
            if(ans.answer == this.word || this.originalSynonym.includes(ans.answer)){
                printer.printLine("\nYou won the game!!!".green);
                break;
            }else{
                this.firstStatement = '\n\nPlease guess the word again: '
                let ans = await this.promtOptions();
                let choice = this.choices.indexOf(ans.answer);
                if(choice == 1){
                    var num = this.getRandNum(1,4);
                    if(num==1){
                        this.printShuffledWord();
                    }else if(num==2){
                        if(this.definations.length)
                            this.printDefination();
                        else
                            this.printShuffledWord();
                    }else if(num==3){
                        if(this.synonym.length)
                            this.printSynonym();
                        else
                            this.printShuffledWord();
                    }else{
                        if(this.antonym.length)
                            this.printAntonym();
                        else
                            this.printShuffledWord();
                    }
                }else if(choice == 2){
                    const controller = new Controller();
                    printer.printLine(`\n\nWord is: `.blue + this.word.green);
                    controller.showFullDict(this.word);
                    break;
                }
            }
        }
    }

    async promptQuestion(question){
        
        const questionObj = {
            type: 'input',
            name: 'answer',
            message: question.yellow
        };
        return await prompt(questionObj);
    }

    async promtOptions(){
        const questionObj = {
            type: 'list',
            name: 'answer',
            message: '\nYou have entered a wrong answer.\n'.red+'Please choose one of the options to coninue: '.blue,
            choices: this.choices
        };
        return await prompt(questionObj);
    }


    printShuffledWord(){
        printer.printLine("\nShuffled word is:".blue);
        printer.printLine(this.word.shuffle());
    }


    printDefination(){
        printer.printLine("\nDefination of the word:".blue);
        printer.printLine(this.getRandom(this.definations));
    }

    printSynonym(){
        if(this.synonym.length > 0){
            printer.printLine("\nSynonym of the word:".blue);
            printer.printLine(this.getRandom(this.synonym));
        }else{
            printer.printLine("\nNo Synonym".red);
        }
    }

    printAntonym(){
        if(this.antonym.length > 0){
            printer.printLine("\nAntonym of the word:".blue);
            printer.printLine(this.getRandom(this.antonym));
        }else{
            printer.printLine("\nNo Antonym".red);
        }
    }

    getRandom(list){
        let max = list.length-1, min = 0;
        let randomIndex = this.getRandNum(min,max);
        let data = list[randomIndex];
        list.remove(list[randomIndex]);
        return data;
    }

    getRandNum(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}