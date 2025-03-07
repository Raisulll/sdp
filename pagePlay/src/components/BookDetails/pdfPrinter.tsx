import React from "react";

interface PDFPrinterProps {
  file: string;
}

const PDFPrinter: React.FC<PDFPrinterProps> = ({ file }) => {
  const print = () => {
    const pdfFrame = document.createElement("iframe");
    pdfFrame.style.visibility = "hidden";
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.onload = () => {
      pdfFrame.contentWindow?.focus();
      pdfFrame.contentWindow?.print();
      document.body.removeChild(pdfFrame);
    };
  };

  return (
    <i className="fas fa-print clickable" onClick={print} title="download" />
  );
};

export default PDFPrinter;
