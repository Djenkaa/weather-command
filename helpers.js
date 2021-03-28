module.exports.kelvinToCelsius = (kelvin) => {

    let celsius = parseFloat(kelvin) - 273.15;

    return celsius.toFixed(2);
}