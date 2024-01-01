const express = require('express');
require("../model/uploadpdfModel")
const multer  = require('multer')
const mongoose=require("mongoose");



const uploadpdfRouter = express.Router();



const PdfSchema=mongoose.model("PdfDetails")


uploadpdfRouter.use("/files",express.static("files"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



  //upload pdf
  uploadpdfRouter.post("/uploadfiles/:token", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    const token= req.params.token;
    
    console.log("jjj",title);
    try {
      await PdfSchema.create({ title: title, pdf: fileName,token:token });
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });


//view   pdf token based
  uploadpdfRouter.get("/getfiles/:token", async (req, res) => {
    try {
      PdfSchema.find({token:req.params.token}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });


  module.exports = uploadpdfRouter;
