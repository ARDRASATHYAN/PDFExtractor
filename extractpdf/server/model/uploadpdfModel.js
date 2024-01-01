const mongoose=require("mongoose");


const PdfDetailsSchema=new mongoose.Schema({
    pdf:String,
    title:String,
    token:String,
   
},{collection:'PdfDetails'})

mongoose.model("PdfDetails",PdfDetailsSchema)