import { Component } from '@angular/core';
import *as jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'pdfComplete';
  textoTotal: any;
  texto: any;
  lineas: any;
  dimtext: any;
  altoTotal: any 
  anchoTotal: any 
  anchoLinea: any
  columnas: any;
  format: any;
  fontSize: any;
  x: any = 25;
  y: any = 25;
  constructor() { }
 
  
  ngOnInit() {
    //this.crearPDF();
    
    
  }
  crearPDF() {
    this.texto;
    this.columnas;
    this.format;
    this.fontSize;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      //aling:'justify',
      format: this.format
    });
    doc.setFontSize(this.fontSize)
    this.altoTotal = doc.internal.pageSize.height;
    this.anchoTotal = doc.internal.pageSize.width;
    //this.anchoTotal = doc.internal.pageSize.width;-25 a4
    let anchoColumna = (this.anchoTotal / this.columnas) - 25;
    this.lineas = doc.splitTextToSize(this.texto, anchoColumna);
    this.dimtext = doc.getTextDimensions(this.texto)
    this.anchoLinea = (this.anchoTotal / this.columnas) + (this.dimtext.h + 5);
    let count = 0
    let totalcolumnas = this.columnas;
    let alturaPagina = this.altoTotal
    let dimensionArray;
    for (let i = 0; i < this.lineas.length; i++) {
      count += 1;
      dimensionArray = parseInt(this.dimtext.h) * count;
      if (dimensionArray < this.altoTotal-50) {
        doc.text(this.lineas[i], this.x, this.y)
        this.y += this.dimtext.h;
        let currentDim = doc.getTextDimensions(this.lineas[i])
        alturaPagina -= currentDim.h
      } else {
        if (alturaPagina <= 110 && (this.columnas === 1 || totalcolumnas === 1)) {
          doc.addPage();
          doc.text(this.lineas[i], 25, 25);
          this.y = 25;
          this.y += this.dimtext.h;
          alturaPagina = this.altoTotal
          count = 1;
          totalcolumnas = this.columnas
          this.x = 25
        } else {
          
          this.x += anchoColumna + 5;
          this.y = 25;
          count = 1;
          alturaPagina = this.altoTotal
          doc.text(this.lineas[i], this.x, this.y);
          this.y += this.dimtext.h;
          totalcolumnas -=1
        }
      }
    }
    doc.save('test.pdf');
  }
}

