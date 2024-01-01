import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from '../components/Pdfcomp.jsx';
import './uploadpdf.css';
import '../components/navbar.css';
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  



function Uploadpdf() {



    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const token=localStorage.getItem('user_token')
  const navigate=useNavigate()
  console.log("oo",token);
  console.log("ooo",pdfFile);




    useEffect(() => {
      getPdf();
    }, []);
  
  
    const getPdf = async () => {
      const result = await axios.get(`http://localhost:3000/upload/getfiles/${token}`);
      console.log(result.data.data);
      setAllImage(result.data.data);
    };
  
  
    
  
  
  //upload pdf
    const submitImage = async (e) => {
      if(token){
        e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      console.log(title, file);
  
      const result = await axios.post(
        `http://localhost:3000/upload/uploadfiles/${token}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      if (result.data.status == "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
      }
      else{
        navigate('/')
      }
      
    };
  
  //view pdf
    
    const showPdf = (pdf) => {
      
      setPdfFile(`http://localhost:3000/files/${pdf}`)
    };
  
  
    
  return (
    <>
       <div className="App">
<Navbar/>
  
<div className='container'>
<div class="content" style={{paddingBottom:"20px"}}>

<h1 className="shodow">PDF EXtractor</h1>
<p className='mb-5' >Effortlessly extract and organize data from PDF documents with our PDF Extractor. <br/>
This tool simplifies the process of extracting and organizing information from PDFs,<br/>
making it easy for you to manage and utilize the data effectively.

</p>
</div>
<form className="formStyle" onSubmit={submitImage}>
 <h4>Upload Pdf </h4>
 <br />
 <input
   type="text"
   className="form-control"
   placeholder="Title"
   required
   onChange={(e) => setTitle(e.target.value)}
 />
 <br />
 <input
   type="file"
   class="form-control"
   accept="application/pdf"
   required
   
   onChange={(e) => setFile(e.target.files[0])}
 />
 <br />
 <button class="btn btn-primary" type="submit">
  Upload
 </button>
</form>
</div>
<div className="uploaded">
 <h4 className="shodow">Uploaded PDF:</h4>
 <div className=" row row-cols-1 row-cols-md-6 g-4">
 {allImage == null
     ? ""
     : allImage.map((data) => {
         return (
           <div className="">
            <h6>Title: {data.title}</h6>
             <button
               className="btn btn-primary"
               onClick={() => showPdf(data.pdf)}
             >
               ShowPdf
             </button>
           </div>
         );
       })}
 </div>
</div>

<PdfComp pdfFile={pdfFile}/>
</div>

    </>
  )
}

export default Uploadpdf
