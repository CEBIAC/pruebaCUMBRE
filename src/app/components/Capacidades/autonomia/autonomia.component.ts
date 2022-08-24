import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-autonomia',
  templateUrl: './autonomia.component.html',
  styleUrls: ['./autonomia.component.scss'],
})
export class AutonomiaComponent implements OnInit {
  copys = [
    'Aunque procuro avanzar en mi proyecto de forma independiente, reconozco cuando es necesario apoyarme de otros para avanzar en el proyecto.',
    'Estoy convencido/a del valor de mi proyecto emprendedor, aunque otros no crean en el éxito de mi idea de negocio.',
    'Cuando necesito solucionar un inconveniente, prefiero resolverlo inicialmente por mi mismo/a antes de acudir a terceros.',
    'Soy capaz de mantener y defender mi postura con dureza si la situación lo amerita.',
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
  rptasAutonomia = Array();
  progress = 0.234;
  constructor(private app: AppComponent) {}

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasAutonomia[this.index] = parseFloat(event.srcElement.value);
        //console.log(this.rptasAutonomia);
      }
    });
  }

  continuar() {
    if (this.rptasAutonomia[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasAutonomia);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasAutonomia, 5);
        this.app.promedioDimension('Autonomia', this.rptasAutonomia);
        this.app.navegarA('/questionary/creatividad');
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
