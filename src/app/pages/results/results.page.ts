import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import * as jQuery from 'jquery';



@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  sections;

  constructor(private router: Router) {
    this.sections = 0;
  }
  



  public downloadPDF(): void {
    const DATA1 = document.getElementById('parte1');
    const DATA2 = document.getElementById('parte2');
    const DATA3 = document.getElementById('parte3');
    const DATA4 = document.getElementById('parte4');
    const doc = new jsPDF('p','pt','a4');
    doc.context2d.pageWrapYEnabled = true;
    const options = {
      background: "white",
      scale:3,
      pagesplit: true,
    };
    
    html2canvas(DATA1, options).then((canvas) =>{
      const img = canvas.toDataURL('./results.page.html');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'resultados', 'FAST');
      return doc;

    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });


    html2canvas(DATA2, options).then((canvas) =>{
      const img = canvas.toDataURL('./results.page.html');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'Capacidades para el emprendimiento', 'FAST');
      return doc;

    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });


    html2canvas(DATA3, options).then((canvas) =>{
      const img = canvas.toDataURL('./results.page.html');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'Planeación', 'FAST');
      return doc;

    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });


    html2canvas(DATA4, options).then((canvas) =>{
      const img = canvas.toDataURL('./results.page.html');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'Habilidades sociales ', 'FAST');
      return doc;

    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
  ngOnInit() {}


  //Metodo para enviar a results
  
}