import fs from "fs";
import parse from "csv-parser";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const handleConvertion = async (csvData, pdfPath) => {
  try {
    // 1. pdf file it's been created here

    const onCreatePDF = await PDFDocument.create();
    const pdfProperties = await onCreatePDF.addPage();
    const { width, height } = pdfProperties.getSize();
    const newWidth = width * 1.5; // Define a nova largura (150% da original)
    pdfProperties.setSize(newWidth, height);
    
    // 2. CSV main settings in PDF
   
    const font = await onCreatePDF.embedFont(StandardFonts.HelveticaOblique);
    const tableWidth = width - 90;
    const tableHeight = height - 20;
    const cellWidth = tableWidth / csvData[0].length;
    const cellHeight = 20;

    let tableY = height - tableHeight - 10;

    // Loop to create cell and table -> Two loops: axies Y and axies X 
    for (const row of csvData) {
      let tableX = 10;
      for (const cell of row) {
        pdfProperties.drawText(cell, {
          x: tableX,
          y: tableY,
          font,
          size: 12,
          color: rgb(0, 0, 0),
        });
        tableX += cellWidth;
      }
      tableY += cellHeight;
    }

    const onSavePDF = await onCreatePDF.save();
    /* file system attribute to read file and path that will be saved. */ 
    fs.writeFileSync(pdfPath, onSavePDF);
    /* display log if the output was generated */ 
    console.log(`Arquivo PDF gerado com sucesso: ${pdfPath}`);
  } catch (error) {
    console.log(error);
  }
};

