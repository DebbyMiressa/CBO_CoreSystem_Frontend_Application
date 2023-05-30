import { Component, ElementRef, ViewChild } from '@angular/core';
//import jsPDF from 'jspdf';
import { DispService } from '../../MemoFile/disp.service';

declare var require: any;

//import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from "pdfmake/build/vfs_fonts";
//const htmlToPdfmake = require("html-to-pdfmake");
//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent {

  constructor( private dispService:DispService){};

   refno:number = this.dispService.refno;
   curdate:Date = this.dispService.curdate;
   sendate:Date = this.dispService.sendate;
   to:string = this.dispService.to;
   from:string = this.dispService.from;
   cc:string = this.dispService.cc;
   subject:string = this.dispService.subject;
   body:string = this.dispService.body;








   @ViewChild('content',{ static:false}) el!: ElementRef



  public async Download(){
      //  let pdf  = new jsPDF('p','pt','a4');

      //  pdf.html(this.el.nativeElement,{
      //   callback: (pdf) => {
      //     pdf.save('sample.pdf');
      //   }
      //  })
      //------------------------------------------
    //   const doc = new jsPDF('p','pt','a4');
    //   doc.html(document.getElementById('content'), {
    //     callback: function (doc) {
    //       doc.save();
    //     }
    //  });
    //---------------------------------------------------
    // const pdfTable = this.el.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).download();
    //------------------------------------------------------
    window.print();


  }





}
