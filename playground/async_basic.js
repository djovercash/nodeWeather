console.log("Starting App")

setTimeout(() => {
  console.log("First setTimeout")
}, 2000)

setTimeout(() => {
  console.log("Second setTimeout")
}, 0)

console.log("Finishing Up")
