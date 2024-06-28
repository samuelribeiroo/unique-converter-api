import { fs } from "fs";
import { parse } from "csv-parser";
import { PDFDocument } from "pdf-lib";

const handleConvertion = async (csvData, pdfPath) => {
  // 1. In this block are create the PDF file.

  try {
    const onCreatePDF = await PDFDocument.create();
    const pdfProperties = await onCreatePDF.addPage();
    const { width, height } = pdfProperties.getSize();

    // 2. CSV main settings in PDF
    const tableWidth = width - 20;
    const tableHeight = height - 20;
    const cellWidth = tableWidth / csvData[0].length;
    const cellHeight = 20;
  } catch {}
};
