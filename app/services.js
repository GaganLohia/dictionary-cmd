import Constants from "./constants"
import axios from "axios"
import Spinner from "cli-spinner";


let spinner = new Spinner.Spinner("Processing...");
spinner.setSpinnerString(0);
export default class Services {
    constructor() { }

    async getWordDefinations(word) {
        try {
            spinner.start();
            const res = await axios.get(`${Constants.HOST}/word/${word}/definitions?api_key=${Constants.API_KEY}`)
            spinner.stop(true);
            return {
                success: true,
                data: res.data
            };
        } catch (err) {
            return this.commonErrorCallback(err);
        }
    }

    async getRelatedWords(word) {
        try {
            spinner.start();
            const res = await axios.get(`${Constants.HOST}/word/${word}/relatedWords?api_key=${Constants.API_KEY}`)
            spinner.stop(true);
            return {
                success: true,
                data: res.data
            };
        } catch (err) {
            return this.commonErrorCallback(err);
        }
    }

    async getRandomWord() {
        try {
            spinner.start();
            const res = await axios.get(`${Constants.HOST}/words/randomWord?api_key=${Constants.API_KEY}`)
            spinner.stop(true);
            return {
                success: true,
                data: res.data.word
            };
        } catch (err) {
            return this.commonErrorCallback(err);
        }
    }

    commonErrorCallback(err) {
        var data = 'Some Error Occured!';
        if (err && err.response && err.response.status && err.response.status == 400) {
            data = 'Word Not Found!';
        }
        spinner.stop(true);
        return {
            success: false,
            data: data
        };
    }
}