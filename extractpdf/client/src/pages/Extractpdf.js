import React, { useEffect, useState } from 'react'
import Extractedpdfview  from '../components/Extractpdfcomp';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Extractpdf() {
    const [allextract, setAllEtract] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const token=localStorage.getItem('user_token')


    // function for handling download
    const downloadPdf = async (pdfFileName) => {
        try {
          const response = await axios.get(`http://localhost:3000/files/${pdfFileName}`, {
            responseType: 'blob', // This ensures that the response is treated as a binary blob
          });
      
          // Create a Blob from the PDF data
          const blob = new Blob([response.data], { type: 'application/pdf' });
      
          // Create a link element
          const link = document.createElement('a');
      
          // Set the href attribute with a Blob URL
          link.href = window.URL.createObjectURL(blob);
      
          // Specify the download attribute with the desired file name
          link.download = pdfFileName;
      
          // Append the link to the document body
          document.body.appendChild(link);
      
          // Trigger a click on the link to start the download
          link.click();
      
          // Remove the link from the document body
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };


  

        const handleDownload = (pdf) => {
      
          downloadPdf(pdf);
        };

    useEffect(() => {
        getextractPdf();
      }, []);
    
//show all pdf
      const getextractPdf = async () => {
        const result = await axios.get(`http://localhost:3000/extract/getextracted-files/${token}`);
        console.log(result.data.data);
        setAllEtract(result.data.data);
      };

     //view pdf
      const showPdf = (pdf) => {
       
        setPdfFile(`http://localhost:3000/files/${pdf}`)
        console.log("pdf",pdfFile)
      };
  return (
    <>
    <Navbar/>
    <div className="uploaded">
    <h4 className="shodow">Extracted PDF:</h4>
    <div className="output-div row row-cols-1 row-cols-md-6 g-4">
    {allextract == null
        ? ""
        : allextract.map((data) => {
      
            return (
              <div className="inner-div ">
                 <h6>Time: {data.time}</h6>
                <button
                  className="btn btn-primary"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show Pdf
                </button>
                <div>
                  <button className='btn btn-outline-success' onClick={()=>handleDownload(data.pdf)}>Download PDF</button>
                 </div>
              </div>
              
            );
          })}
    </div>
  </div>
  <Extractedpdfview pdfFile={pdfFile}/>
  </>
  )
}

export default Extractpdf
