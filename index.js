const yargs = require('yargs/yargs');
const {
    hideBin
} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const flags = require('./flags');


if (argv.hasOwnProperty('city') && argv.hasOwnProperty('d')) {

    console.log('we are working on it...');

} else if (argv.hasOwnProperty('city')) {

    flags.city(argv.city);
}


// let myTable = new Table({
//     head: ['Description', 'Min temp', 'Max temp', 'Feels like']
//   , colWidths: [40, 20, 20, 20]
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// myTable.push(
//     ['light rain', '7.78°', '9°', '1°']
// );

// console.log(myTable.toString());