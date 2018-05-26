const request = require('request')

geocodeAddress = (address, callback) => {
  var addressEncode = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}&key=AIzaSyCzDJSWxBbGQ_VdXT-aITZRQELquy1CqFc`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google')
    } else if (body.status === "ZERO_RESULTS") {
      callback('Zero Result for given address')
    } else if (body.status === "OK"){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else {
    console.log("WHAT?")
    }
  })
}

module.exports = {
  geocodeAddress
}



// dedac8699c06b18d90be6c3fc8be82ee

//https://api.darksky.net/forecast/dedac8699c06b18d90be6c3fc8be82ee/37.8267,-122.4233
