#!/usr/bin/env node

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

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}