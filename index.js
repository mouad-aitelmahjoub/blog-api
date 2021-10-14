const express = require("express")
const app = express()

app.listen("5000", () => {
  console.log("Backend is running now ")
})

app.use("/", (req, res) => {
  console.log("this is main url")
})
