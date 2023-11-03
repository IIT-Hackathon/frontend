"use client"
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import { Button } from './ui/button';


const PdfGenerator = ({ input }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      {isClient && 
      <PDFDownloadLink document={<PdfDocument prescription={input} />} fileName={input[2].doctor.firstName + " " + input[2].doctor.lastName + " prescription" }>
        {({ blob, url, loading, error }) =>
          loading ? <Button>Loading...</Button> : <Button className="bg-[#2387a0]">Download Prescription</Button>
        }
      </PDFDownloadLink>
      }
    </div>
  );
};

export default PdfGenerator;





