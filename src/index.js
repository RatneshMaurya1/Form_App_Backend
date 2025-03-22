const express = require("express")
const app = express()
require("dotenv").config()
const connectDb = require("./config/db")
const port = process.env.port || 3000

app.get("/", (req,res) => {
    res.send("hello world")
})

connectDb()
.then(() => {
    console.log("database connected")
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
})
.catch((err) => {
    console.log("error connecting to database")
})
