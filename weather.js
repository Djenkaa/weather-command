const axios = require('axios');
const config = require('./config.json');
const helpers = require('./helpers');
const moment = require('moment');


let city = Symbol();

// Weather api

let weatherApiUrl = Symbol();
let weatherApiKey = Symbol();

// Country api

let countryApiUrl = Symbol();

// Timezone api

let timezoneApiUrl = Symbol();
let timezoneApiKey = Symbol();


class Weather {

    constructor(cityName) {

        this[city] = cityName;

        this[weatherApiUrl] = config.weatherApiUrl;
        this[weatherApiKey] = config.weatherApiKey;

        this[countryApiUrl] = config.countryApiUrl;

        this[timezoneApiUrl] = config.timezoneApiUrl;
        this[timezoneApiKey] = config.timezoneApiKey;
    }


    /**
     * Get current weather data by city name
     * 
     */
    currentByCityName() {

        return new Promise(async (res, rej) => {

            try {

                let data = await this.getCurrentWeatherByCity();

                if (data) {

                    let time = await this.getCountryTimezoneByName(data.name);

                    if (time) {

                        let country = await this.getCountryNameByCode(data.sys.country);

                        if (country) {

                            let celsius = helpers.kelvinToCelsius(data.main.temp);

                            let currentTime = moment(time.datetime).format('lll');

                            res({
                                currentTemp: celsius,
                                time: currentTime,
                                location: `${data.name}, ${country.name}`
                            });
                        }
                    }
                }
            } catch (e) {

                rej(e);
            }
        });
    }


    /**
     * Get current weather data by city name
     * 
     * @returns 
     */
    getCurrentWeatherByCity() {

        return new Promise(async (res, rej) => {

            try {

                let data = await axios.get(`${this[weatherApiUrl]}?q=${this[city]}&appid=${this[weatherApiKey]}`);

                if (data.status === 200) res(data.data);

            } catch (e) {

                rej(e);
            }
        });
    }


    /**
     * Get country name by its code
     * 
     * @param {*} countryCode 
     * @returns 
     */
    getCountryNameByCode(countryCode) {

        return new Promise(async (res, rej) => {

            try {

                let country = await axios.get(`${this[countryApiUrl]}/${countryCode}`);

                if (country.status === 200) res(country.data);

            } catch (e) {

                rej(e);
            }
        });
    }


    /**
     * Get current time by country name
     * 
     * @param {*} countryName 
     * @returns 
     */
    getCountryTimezoneByName(countryName) {

        return new Promise(async (res, rej) => {

            try {

                let time = await axios.get(`${this[timezoneApiUrl]}?api_key=${this[timezoneApiKey]}=${countryName}`);

                if (time.status === 200) res(time.data);

            } catch (e) {

                rej(e);
            }
        });
    }
}


module.exports = Weather;