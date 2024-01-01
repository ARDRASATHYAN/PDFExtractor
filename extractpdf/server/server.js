const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const cors=require("cors");

const loginRouter = require('./router/loginRouter');
const registerRouter = require('./router/registerRouter');
const extractpdfRouter = require('./router/extractpdfRouter');
const uploadpdfRouter = require('./router/uploadpdfRouter');



 
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/files",express.static("files"))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoUrl="mongodb+srv://sardra9988:12345@pdfoperation.ulqerne.mongodb.net/"

mongoose.connect(mongoUrl,{   useNewUrlParser: true,
  useUnifiedTopology: true, })
.then(()=>{
    console.log("database connected");
})
.catch((e)=>console.log(e));  

app.use('/api',registerRouter);
app.use('/log', loginRouter);
app.use('/extract',extractpdfRouter);
app.use('/upload', uploadpdfRouter);

app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});