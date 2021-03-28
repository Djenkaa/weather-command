const axios = require('axios');
const chalk = require('chalk');
const config = require('./config.json');
const helpers = require('./helpers');
const moment = require('moment');
const emoji = require('node-emoji');



let city = Symbol();
let apiUrl = Symbol();
let apiKey = Symbol();


class Weather {

    constructor(cityName) {

        this[city] = cityName;
        this[apiUrl] = config.apiUrl;
        this[apiKey] = config.apiKey;
    }

    async currentByCityName() {

        try {

            console.log(`${emoji.get('hourglass_flowing_sand')} ${chalk.bold('Start searching...\n')}`);

            let data = await axios.get(`${this[apiUrl]}?q=${this[city]}&appid=${this[apiKey]}`);

            if (data.data) {

                let time = await axios.get(`https://timezone.abstractapi.com/v1/current_time?api_key=468b2a5d4adf4301836e7459942d7bae&location=${data.data.name}`)

                if (time.data) {

                    let country = await axios.get(`https://restcountries.eu/rest/v2/alpha/${data.data.sys.country}`);

                    if (country.data) {

                        let celsius = helpers.kelvinToCelsius(data.data.main.temp);

                        console.log(chalk.blue.bold(`${emoji.get('sun_with_face')} ${celsius}°`));

                        let currentTime = moment(time.data.datetime).format('lll');

                        console.log(chalk.yellow.bold(`${emoji.get('cityscape')}  ${data.data.name}, ${country.data.name}`));

                        console.log(chalk.green.bold(`${emoji.get('timer_clock')}  ${currentTime}`));
                    }
                }
            }
        } catch (e) {

            console.log(chalk.white.bgRed.bold('Something went wrong!'));
        }
    }
}


module.exports = Weather;