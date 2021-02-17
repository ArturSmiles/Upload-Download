const route = require("express").Router()
const fs  = require("fs-extra")
const {join} = require("path")
const multer = require("multer")

const upload = multer();

const publicFolderPath = join(__dirname,"../../../public")

const PORT = process.env.NODE_ENV === "production" ? null : process.env.PORT
route.get("/",async(req,res,next)=>{
    try{
        const files =  await fs.readdir(publicFolderPath);
        const urls = files.map((file)=>`${req.protocol}://${req.hostname}${PORT?":"+PORT:""}/${file}`)
        res.send(urls)
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
})

route.get("/:name",async(req,res,next)=>{
    try{
        let files =  await fs.readdir(publicFolderPath);
        let file= files.find(file=>file===req.params.name)
        if(file){
            const url= `${req.protocol}://${req.hostname}${PORT?":"+PORT:""}/${file}`
            res.redirect(url)
        }
        else{
            res.status(404).send({message:`${req.params.name} is not found in disk!`})
        }
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
})

route.post("/",upload.single("file"),async(req,res,next)=>{
    try {
        await fs.writeFile(publicFolderPath+"/"+req.file.originalname,req.file.buffer)
        const url= `${req.protocol}://${req.hostname}${PORT?":"+PORT:""}/${req.file.originalname}`
        res.send(url)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.put("/:name",upload.single("file"),async(req,res,next)=>{
    try {
        console.log(req.file)
        await fs.writeFile(publicFolderPath+"/"+req.params.name,req.file.buffer)
        const url= `${req.protocol}://${req.hostname}${PORT?":"+PORT:""}/${req.file.originalname}`
        res.send(url)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.delete("/:name",async(req,res,next)=>{
    try {
        await fs.unlink(publicFolderPath+"/"+req.params.name)
        res.send("removed")
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = route;