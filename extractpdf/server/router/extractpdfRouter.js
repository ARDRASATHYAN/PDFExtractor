const express = require('express');
require("../model/extractpdfModel")
const multer  = require('multer')
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose=require("mongoose");


const extractpdfRouter = express.Router();



const extractSchema=mongoose.model("Pdfextract")


extractpdfRouter.use("/files",express.static("files"))

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



  //view extract pdf
  extractpdfRouter.get("/getextracted-files/:token", async (req, res) => {
    try {
      extractSchema.find({token:req.params.token}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });



  //generate extract pdf
  extractpdfRouter.post('/generate-pdf/:path/:token', async (req, res) => {
    const selectedPages = req.body.selectedPages;
    const paths=req.params.path
     const time=req.body.time
     const token=req.params.token
     console.log("tok",token);
     console.log("time",time);
    console.log('why', JSON.stringify(paths));
    console.log('hello',selectedPages);
    const existingPdfPath = `./files/${paths}`; // Set the path to your existing PDF
    
    try {
      const existingPdfBytes = await fs.readFile(existingPdfPath);
  
      console.log('mmm',existingPdfBytes);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      console.log('hhh',pdfDoc);
  
  
  
      const newPdfDoc = await PDFDocument.create();
  
      console.log('ccc',newPdfDoc);
  
  
  
      for (const pageNumber of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }
      console.log('ddd',newPdfDoc);
  
  
      const newPdfBytes = await newPdfDoc.save();
      const uniqueId = uuidv4(); // Generate a unique identifier
  
      await extractSchema.create({  pdf: `new_${uniqueId}.pdf` ,token:req.params.token});
  
  
  
      const newPdfPath = path.join('./files', `new_${uniqueId}.pdf`); // Set the path to save the new PDF
  
      await fs.writeFile(newPdfPath, newPdfBytes);
  
      res.send({ status: 'ok', newPath: newPdfPath });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  module.exports = extractpdfRouter;