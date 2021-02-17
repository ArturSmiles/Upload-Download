const route = require("express").Router()

const fileRouter = require("./file");
const streamRouter = require("./stream")
route.use("/files",fileRouter)
route.use("/streams",streamRouter)

module.exports = route;