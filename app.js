const yargs = require('yargs')

const geocode = require('./geocode/geocode')

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
    console.log(JSON.stringify(results, undefined, 2))
    let lat = results.latitude
    let lng = results.longitude
    console.log(lat, lng)
    showWeather(lat, lng)
  }
})



const request = require('request')

showWeather = (lat, lng) => {
  request({
    url: `https://api.darksky.net/forecast/dedac8699c06b18d90be6c3fc8be82ee/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("Error Here")
    } else {
      console.log(body.currently.summary)
    }
  })
}
