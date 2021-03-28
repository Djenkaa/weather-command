const Weather = require('../weather');
const emoji = require('node-emoji');
const chalk = require('chalk');


module.exports = async (city) => {

    try {

        let currentData = new Weather(city);

        console.log(`${emoji.get('hourglass_flowing_sand')} ${chalk.bold('Start searching...\n')}`);

        let data = await currentData.currentByCityName();

        if (data) {

            console.log(chalk.blue.bold(`${emoji.get('sun_with_face')} ${data.currentTemp}°`));

            console.log(chalk.yellow.bold(`${emoji.get('cityscape')}  ${data.location}`));

            console.log(chalk.green.bold(`${emoji.get('timer_clock')}  ${data.time}`));
        }

    } catch (e) {

        console.log(chalk.white.bgRed.bold('Something went wrong!'))
    }
}
