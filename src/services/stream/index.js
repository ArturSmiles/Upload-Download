const route = require("express").Router()
const fs  = require("fs-extra")
const {join} = require("path")
const mime = require('mime');
const publicFolderPath = join(__dirname,"../../../public/")

route.get("/:name",async(req,res,next)=>{
    try {
        const stream = fs.createReadStream(publicFolderPath+req.params.name)
        res.setHeader("Content-Type",mime.lookup(publicFolderPath+req.params.name))
        stream.pipe(res)
    } catch (error) {
        res.status(500).send(error.message)
    }
});


module.exports = route