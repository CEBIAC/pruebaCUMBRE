import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss'],
})
export class PlanificacionComponent implements OnInit {
  copys = [
    'Si empiezo un proyecto, simplemente actúo sin pensar en los primeros pasos.',
    'Cuento con la capacidad de fragmentar mis objetivos en pequeñas tareas.',
    'La vida del emprendedor está llena de incertidumbre, por eso, emplear esfuerzos haciendo planes es una pérdida de tiempo.',
    'Trato de pensar en varias posibilidades porque sé que pueden darse cosas que no tengo planeadas.',
    'Trato siempre de calcular los tiempos que me toma ejecutar mis actividades.',
    'Siempre sigo el orden establecido dentro de un plan de acción.',
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
  rptasPlanificacion = Array();
  progress = 0.6552;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasPlanificacion[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasPlanificacion)
  }

  continuar() {
    if (this.rptasPlanificacion[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasPlanificacion);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasPlanificacion, 14);
        this.app.promedioDimension('Planificacion', this.rptasPlanificacion);
        this.app.navegarA('/questionary/evaluacion');
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
