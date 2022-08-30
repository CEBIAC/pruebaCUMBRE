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
  select;
  rptasPersistencia = Array();
  progress = 0.14;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasPersistencia[this.index] = parseFloat(event.srcElement.value);
    // console.log(this.rptasPersistencia);
  }

  continuar() {
    if (this.rptasPersistencia[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      // console.log(this.rptasPersistencia);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasPersistencia, 3);
        this.app.promedioDimension('Persistencia', this.rptasPersistencia);
        this.app.navegarA('/questionary/riesgo');
      } else {
        this.select = '';
        this.index++;
        this.copy = this.copys[this.index];
        this.progress = this.progress + 0.0117;
      }
    }
  }

  ngOnInit() {}
}
