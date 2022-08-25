import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Average } from '../interfaces/average';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async generarPDF(name, date, copys: Average, copyGlobal) {
    const pdfDoc = await PDFDocument.create();
    const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const Helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // PAGINA 1 -----------------------------------------------------------------------------
    // Add a blank page1 to the document
    const page1 = pdfDoc.addPage();

    // Get the width and height of the page1
    const { width, height } = page1.getSize();
    console.log(page1.getSize());

    // Draw a string of text toward the top of the page1
    const pngUrl = '/assets/results/FondoResults.png';
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // const pngDims = pngImage.scale(1);

    page1.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: width + 20,
      height: height + 20,
    });

    // Nombre de la persona _______________________________________________________________
    const nameSize = 25;
    const nameWidth = HelveticaBold.widthOfTextAtSize(name, nameSize);
    page1.drawText(name, {
      x: (width - nameWidth) / 2,
      y: height - 30,
      size: nameSize,
      color: rgb(255 / 255, 255 / 255, 255 / 255),
      font: HelveticaBold,
      maxWidth: width - 10,
    });

    // Fecha de la prueba _______________________________________________________________
    const dateSize = 18;
    const dateWidth = HelveticaBold.widthOfTextAtSize(date, dateSize);
    page1.drawText(date, {
      x: (width - dateWidth) / 2,
      y: height - 57,
      size: dateSize,
      color: rgb(255 / 255, 255 / 255, 255 / 255),
      font: HelveticaBold,
      maxWidth: width - 10,
    });

    // Autoeficiencia _______________________________________________________________

    let copy1 = copys.copyAutoeficacia;
    console.log(copy1);
    const title1Size = 16;
    const copy1Size = 14;
    const title1Width = Helvetica.widthOfTextAtSize('Autoeficacia', title1Size);
    const copy1Width = Helvetica.widthOfTextAtSize(copy1, copy1Size);
    const cop1Height = Helvetica.sizeAtHeight(copy1Size) * (copy1Width / 445) + 15;
    const y1 = 100;
    console.log(cop1Height);

    let svgPath1 =
      'M0,0 h445 a20,20 0 0 1 20,20 v' +
      cop1Height +
      ' a20,20 0 0 1 -20,20 h-445 a20,20 0 0 1 -20,-20 v-' +
      cop1Height +
      ' a20,20 0 0 1 20,-20 z';

    page1.drawSvgPath(svgPath1, {
      x: 70,
      y: height - (y1),
      borderColor: rgb(1, 1, 1),
      color: rgb(1, 1, 1),
    });

    page1.drawText('Autoeficacia', {
      x: (width - title1Width) / 2,
      y: height - (y1 + 20),
      size: title1Size,
      color: rgb(82 / 255, 195 / 255, 168 / 255),
      lineHeight: 15,
      font: HelveticaBold,
      maxWidth: 445,
    });

    page1.drawText(copy1, {
      x: 70,
      y: height - (y1 + 40),
      size: copy1Size,
      color: rgb(0, 0, 0),
      lineHeight: 15,
      font: Helvetica,
      maxWidth: 445,
    });

    // Locus de control _______________________________________________________________

    let copy2 = copys.copyControl;
    console.log(copy2);
    const copy2Size = 14;
    const copy2Width = Helvetica.widthOfTextAtSize(copy2, copy2Size);
    const copy2Height = Helvetica.sizeAtHeight(copy2Size) * (copy2Width / 445);
    console.log(copy2Height);
    let x2 = 340;

    let svgPath2 =
      'M0,0 h445 a20,20 0 0 1 20,20 v' +
      copy2Height +
      ' a20,20 0 0 1 -20,20 h-445 a20,20 0 0 1 -20,-20 v-' +
      copy2Height +
      ' a20,20 0 0 1 20,-20 z';

    page1.drawSvgPath(svgPath2, {
      x: 70,
      y: height - 315,
      borderColor: rgb(1, 1, 1),
      color: rgb(1, 1, 1),
    });

    page1.drawText(copy2, {
      x: 70,
      y: height - 340,
      size: copy2Size,
      color: rgb(82 / 255, 195 / 255, 168 / 255),
      lineHeight: 15,
      font: Helvetica,
      maxWidth: 445,
    });

    page1.drawText(copy2, {
      x: 70,
      y: height - 340,
      size: copy2Size,
      color: rgb(0, 0, 0),
      lineHeight: 15,
      font: Helvetica,
      maxWidth: 445,
    });

    // PAGINA 2 -----------------------------------------------------------------------------
    // Add a blank page1 to the document
    const page2 = pdfDoc.addPage();
    const pngUrl2 = '/assets/results/FondoResults2.png';
    const pngImageBytes2 = await fetch(pngUrl2).then((res) => res.arrayBuffer());
    const pngImage2 = await pdfDoc.embedPng(pngImageBytes2);

    // const pngDims = pngImage.scale(1);

    page2.drawImage(pngImage2, {
      x: 0,
      y: 0,
      width: width + 20,
      height: height + 20,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    this.saveByteArray('Resultados prueba CUMBRE.pdf', pdfBytes);
  }

  saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'application/pdf' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }
}
