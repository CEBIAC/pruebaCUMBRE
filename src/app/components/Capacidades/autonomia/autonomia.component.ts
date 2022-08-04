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

  index = 1;
  rptasAutonomia = Array();
  progress = 0.234;
  constructor(private app: AppComponent, private adap: QuestionaryPage) {}

  seleccionar(event, opc) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasAutonomia[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasAutonomia);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasAutonomia[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasAutonomia);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasAutonomia, 5);
        this.app.promedioDimension(this.rptasAutonomia, 5);
        this.app.navegarA('/questionary/creatividad');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyAutonomia: HTMLElement =
              document.getElementById('copyAutonomia');
            this.index++;
            copyAutonomia.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}
}
