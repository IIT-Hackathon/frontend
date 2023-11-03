import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PDFDocument";
import { ImSpinner5 } from "react-icons/im";
import { Button } from "./ui/button";

const PdfGenerator = ({ input }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient && (
        <PDFDownloadLink
          document={<PdfDocument input={input} />}
          fileName={`report_${input.year}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button>
                <ImSpinner5 className="text-white h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button className="bg-[#2387a0]">Download Report</Button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default PdfGenerator;
