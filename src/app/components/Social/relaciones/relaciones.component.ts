import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.scss'],
})
export class RelacionesComponent implements OnInit {

  copys = ['.', '', '', ''];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasRelaciones = Array();
  progreso = Array(18).fill('virtual', 0, 18);
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
        this.rptasRelaciones[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        console.log(this.rptasRelaciones);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasRelaciones[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasRelaciones);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasRelaciones, 18);
        this.app.promedioDimension(this.rptasRelaciones, 18);
        this.app.navegarA('/questionary/equipo');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyRelaciones: HTMLElement =
              document.getElementById('copyRelaciones');
            this.index++;
            copyRelaciones.textContent = this.copys[this.index - 1];
            this.progreso[this.index - 1] = 'virtual';
            this.progreso[this.index] = 'actual';
          }
        });
      }
    }
  }

  ngOnInit() {
    this.progreso[this.index] = 'actual';
  }

}
