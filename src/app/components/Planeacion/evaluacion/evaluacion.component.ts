import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {

  copys = ['En el desarrollo de un proyecto, me gusta implementar estrategias para verificar el cumplimiento de los planes y la evaluación de resultados.',
    'Cuando cometo un error reviso qué fue lo que falló para que no vuelva a suceder.',
    'Estoy atento a las fallas que se puedan dar en todos los procesos para tener una mejora rápida de los mismos.',
    'Me gusta monitorear los proyectos cuando están finalizados, no cuando se encuentran en proceso.'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasEvaluacion = Array();
  progress = 0.722;
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
        this.rptasEvaluacion[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEvaluacion);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasEvaluacion[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEvaluacion);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasEvaluacion, 15);
        this.app.promedioDimension(this.rptasEvaluacion, 15);
        this.app.navegarA('/questionary/eficiencia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyEvaluacion: HTMLElement =
              document.getElementById('copyEvaluacion');
            this.index++;
            copyEvaluacion.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
