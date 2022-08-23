import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss'],
})
export class PlanificacionComponent implements OnInit {

  copys = ['Si empiezo un proyecto, simplemente actúo sin pensar en los primeros pasos.',
    'Cuento con la capacidad de fragmentar mis objetivos en pequeñas tareas.',
    'La vida del emprendedor está llena de incertidumbre, por eso, emplear esfuerzos haciendo planes es una pérdida de tiempo.',
    'Trato de pensar en varias posibilidades porque sé que pueden darse cosas que no tengo planeadas.',
    'Trato siempre de calcular los tiempos que me toma ejecutar mis actividades.',
    'Siempre sigo el orden establecido dentro de un plan de acción.'];


  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 0;
  copy = this.copys[this.index];
  rptasPlanificacion = Array();
  progress = 0.6552;
  constructor(private app: AppComponent, private adap: QuestionaryPage) { }

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasPlanificacion[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasPlanificacion);
      }
    });
  }

  continuar() {
    if (this.rptasPlanificacion[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasPlanificacion);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasPlanificacion, 14);
        this.app.promedioDimension(this.rptasPlanificacion, 14);
        this.app.navegarA('/questionary/evaluacion');
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
