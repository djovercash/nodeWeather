const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather report',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(results.address)
    let lat = results.latitude
    let lng = results.longitude
    weather.getWeather(results.latitude, results.longitude, (errMessage, weatherResults) => {
      if (errMessage) {
        console.log(errMessage)
      } else {
        console.log(`The weather is currently ${weatherResults.temperature}, but if feels like ${weatherResults.apparentTemp}`)
      }
    })
  }
})
