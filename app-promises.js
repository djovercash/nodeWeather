const yargs = require('yargs')
const axios = require('axios')

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

var encodedAddress = encodeURIComponent(argv.address)
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCzDJSWxBbGQ_VdXT-aITZRQELquy1CqFc`

axios.get(geocodeURL).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address")
  }
  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng
  var weatherURL = `https://api.darksky.net/forecast/dedac8699c06b18d90be6c3fc8be82ee/${lat},${lng}`

  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherURL)
}).then((response) => {
  let temp = response.data.currently.temperature
  let appTemp = response.data.currently.apparentTemperature
  console.log(`The temperature is ${temp}, but it feels like ${appTemp}`)
  }).catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log("Unable to connect to servers")
    } else {
      console.log(error.message)
    }
  })
