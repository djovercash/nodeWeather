asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('Arguements must be numbers')
      }
    }, 2000)
  })
}

asyncAdd(4, 3).then((message) => {
  console.log("Success", message);
  return asyncAdd(message, 33)
}).then((message) => {
  console.log("Should be a number", message)
}).catch((errorMessage) => {
  console.log(errorMessage)
})

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey, it worked!')
//     reject('Unable to filfull promose')
//   }, 2000)
// })
//
// somePromise.then((message) => {
//   console.log("Success", message)
// }, (errorMessage) => {
//   console.log("Error: ", errorMessage)
// })
