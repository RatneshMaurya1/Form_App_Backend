const express = require("express")
const app = express()
require("dotenv").config()
const connectDb = require("./config/db")
const port = process.env.port || 5000
const formRouter = require("./router/formRouter")
const cors = require("cors")

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods:"GET,POST,PUT,PATCH,DELETE"
}
app.use(cors(corsOptions))

app.use(express.json())

app.use("/api", formRouter)

app.get("/", (req,res) => {
    res.send("hello world!")
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
