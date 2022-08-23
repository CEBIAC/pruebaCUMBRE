import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-locus-control',
  templateUrl: './locus-control.component.html',
  styleUrls: ['./locus-control.component.scss'],
})
export class LocusControlComponent implements OnInit {
  copys = [
    'Cuando fracasa alguna actividad de un proyecto en el que avanzo, me cuesta reconocer los factores personales que influyeron en ese resultado.',
    'El éxito de mi proyecto emprendedor depende en buena parte de mi y cómo me las arregle para alcanzar mis objetivos.',
    'Cuando no obtengo los resultados esperados, soy consciente que es porque he fallado en algo.',
    'Cuando las cosas no salen como quiero, identifico todos los errores que cometí para llegar a ese resultado.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 0;
  copy = this.copys[this.index];
  rptasAuto = Array();
  progress = 0.0468;

  constructor(private app: AppComponent) {}

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        this.rptasAuto[this.index] = parseFloat(event.srcElement.value);
        //console.log(this.rptasAuto);
      }
    });
  }

  continuar() {
    if (this.rptasAuto[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      console.log(this.rptasAuto);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimsension(this.rptasAuto, 0);
        this.app.promedioDimension('Autoeficacia', this.rptasAuto);
        this.app.navegarA('/questionary/optimismo');
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
