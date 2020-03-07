import 'babel-polyfill'
import commander from "commander";
import Controller from "./controller"

var controller = new Controller();
commander
    .command("defn <word>")
    .description("Display definitions of a given word.")
    .action((word) => controller.showWordDefinations(word));

commander
    .command("syn <word>")
    .description("Display Synonyms of a given word.")
    .action((word) => controller.showWordSynonyms(word));


commander
    .command("ant <word>")
    .description("Display Antonyms of a given word.")
    .action((word) => controller.showWordAntonyms(word));

commander
    .arguments("<word>")
    .action((word) => controller.showFullDict(word));

commander
    .command("play")
    .action(controller.playGame);

if(process.argv.length<3){
    controller.showRandomWordDict();
}

commander.parse(process.argv);