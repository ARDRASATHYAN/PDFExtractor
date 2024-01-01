import axios from 'axios';
import React from 'react'
import { useState } from "react";
import { Document, Page } from "react-pdf";



function Extractpdfcomp(props) {
    console.log('hahahahaha',props.pdfFile);

    const [numPages, setNumPages] = useState(null);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
      };



      //download pdf
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
            const url = new URL(props.pdfFile);
            var filename = url.pathname.split('/').pop();
       
          downloadPdf(filename);
        };


    
  return (
    <>
    <div className="App">

   <div className="pdf-div">
<Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
  {Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
    <div key={page}>
      
       <span>Page {page}</span>
      <Page
        key={`page_${page}`}
        pageNumber={page}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </div>
    
  ))}
</Document>
<div>
 
</div>
<button className='btn btn-outline-success' onClick={()=>handleDownload(props.pdfFile)} >Download</button>
</div>
</div>


</>
  )
}

export default Extractpdfcomp
