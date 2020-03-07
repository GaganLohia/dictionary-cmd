import Constants from "./constants"
import axios from "axios"

export default class Services {
    constructor() { }

    
    async getWordDefinations(word) {
        try {
            const res = await axios.get(`${Constants.HOST}/word/${word}/definitions?api_key=${Constants.API_KEY}`)
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
            const res = await axios.get(`${Constants.HOST}/word/${word}/relatedWords?api_key=${Constants.API_KEY}`)
            return {
                success: true,
                data: res.data
            };
        } catch (err) {
            return this.commonErrorCallback(err);
        }
    }

    async getRandomWord(){
        try {
            const res = await axios.get(`${Constants.HOST}/words/randomWord?api_key=${Constants.API_KEY}`)
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
        if (err.response.status == 400) {
            data = 'Word Not Found!';
        }
        return {
            success: false,
            data: data
        };
    }
}