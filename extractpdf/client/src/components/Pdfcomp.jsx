import React, { useEffect } from 'react'
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Navigate, useNavigate } from 'react-router-dom';



function Pdfcomp(props) {



    console.log('ardra', props.pdfFile);
    const [numPages, setNumPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
    const token=localStorage.getItem('user_token')
    const navigate=useNavigate()



  if (props.pdfFile) {
    const url = new URL(props.pdfFile);
    var filename = url.pathname.split('/').pop();
    console.log('Filename:', filename);
  } else {
    filename = '';
  }

 
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setSelectedPages([]);
  }, [props]);



  const handleCheckboxChange = (page) => {
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(page)) {
        // Deselect page if already selected
        return prevSelectedPages.filter((selectedPage) => selectedPage !== page);
      } else {
        // Select page if not selected
        return [...prevSelectedPages, page];
      }
    });
  };


  //generate new pdf
  const generateNewPdf = async () => {
    try {
      if(token){
      console.log('adi', filename);
      const response = await fetch(`http://localhost:3000/extract/generate-pdf/${filename}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedPages }),
        
      });

      const data = await response.json();

      if (data.status === 'ok') {
        console.log('New PDF generated:', data.newPath);
        alert("extract Successfully!!!");
       
      } else {
        console.error('Error:', data.message);
      }
      
    }
    else{
      navigate("/")
    }
   } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <>
  
     <div className="pdf-div">
    <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
        <div key={page}>
          <input
            type="checkbox"
            checked={selectedPages.includes(page)}
            onChange={() => handleCheckboxChange(page)}
          />
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
      <p>Selected Pages: {selectedPages.join(', ')}</p>
    </div>
    <button  className="btn btn-danger"onClick={generateNewPdf}>Extractpdf/newpdf</button>
  </div> 
    </>
  )
}

export default Pdfcomp
