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

  index = 0;
  copy = this.copys[this.index];
  rptasNegociacion = Array();
  progress = 0.9594;
  constructor(private app: AppComponent) { }

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasNegociacion[this.index] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasNegociacion);
      }
    });
  }

  continuar() {
    if (this.rptasNegociacion[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasNegociacion);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasNegociacion, 20);
        this.app.promedioDimension('Negociacion', this.rptasNegociacion);
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            this.index++;
            this.copy = this.copys[this.index];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
