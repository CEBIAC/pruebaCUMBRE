import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-persistencia',
  templateUrl: './persistencia.component.html',
  styleUrls: ['./persistencia.component.scss'],
})
export class PersistenciaComponent implements OnInit {
  copys = [
    'Si la ruta que ideé para cumplir mis objetivos falla, se me dificulta crear nuevas alternativas.',
    'Adapto las estrategias de mi proyecto las veces necesarias hasta alcanzar un resultado.',
    'Se me dificulta ser constante cuando inicio un proyecto.',
    'Busco formas de continuar realizando mi proyecto aún cuando existan motivos para descartarlo.',
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
  rptasControl = Array();
  progress = 0.14;
  constructor(private app: AppComponent, private adap: QuestionaryPage) {}

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasControl[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasControl);
      }
    });
  }

  continuar() {
    if (this.rptasControl[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasControl);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasControl, 3);
        this.app.promedioDimension(this.rptasControl, 3);
        this.app.navegarA('/questionary/riesgo');
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
