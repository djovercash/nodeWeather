const request = require('request')

getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/dedac8699c06b18d90be6c3fc8be82ee/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      })
    } else {
      callback("Unable to reach Forecast.io")
    }
  })
}

module.exports = {
  getWeather
}
