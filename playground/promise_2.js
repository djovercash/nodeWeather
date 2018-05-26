const request = require('request')

geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var addressEncode = encodeURIComponent(address)

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}&key=AIzaSyCzDJSWxBbGQ_VdXT-aITZRQELquy1CqFc`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google')
      } else if (body.status === "ZERO_RESULTS") {
        reject('Zero Result for given address')
      } else if (body.status === "OK"){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else {
      console.log("WHAT?")
      }
    })
  })
}

geocodeAddress("10032").then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage)
})
