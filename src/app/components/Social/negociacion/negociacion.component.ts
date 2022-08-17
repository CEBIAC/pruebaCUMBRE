import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-negociacion',
  templateUrl: './negociacion.component.html',
  styleUrls: ['./negociacion.component.scss'],
})
export class NegociacionComponent implements OnInit {


  copys = ['Propongo acuerdos entre varios puntos de vista buscando que todos logremos obtener ganancias.',
    'Me gusta escuchar y analizar antes que hablar.',
    'Suelo convencer a los demás para que sigan mis ideas.',
    'Cuando estoy en medio de una discusión, me esmero por escuchar las dos partes.'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasNegociacion = Array();
  progress = 0.9594;
  constructor(private app: AppComponent, private adap: QuestionaryPage) { }

  seleccionar(event, opc) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasNegociacion[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasNegociacion);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasNegociacion[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasNegociacion);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasNegociacion, 20);
        this.app.promedioDimension(this.rptasNegociacion, 20);
        //this.app.navegarA('/results');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyNegociacion: HTMLElement =
              document.getElementById('copyNegociacion');
            this.index++;
            copyNegociacion.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
