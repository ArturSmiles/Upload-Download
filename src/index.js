const express = require("express")

const app = express();

const services = require("./services")

const {join} = require("path")

const publicFolderPath = join(__dirname,"../public")



app.use("/api",services)

app.use("/",express.static(publicFolderPath))

app.listen(process.env.PORT||5000,() => console.info("App is running on localhost 🚀"))

app.on("error",()=>console.info("App is not running on localhost ❌"))
