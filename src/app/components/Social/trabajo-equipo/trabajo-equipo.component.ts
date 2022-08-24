import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-trabajo-equipo',
  templateUrl: './trabajo-equipo.component.html',
  styleUrls: ['./trabajo-equipo.component.scss'],
})
export class TrabajoEquipoComponent implements OnInit {

  copys = ['En un equipo es importante que se aporten ideas distintas y crear algo nuevo',
    'La gran ventaja de los equipos es el apoyo mutuo',
    'Prefiero tener logros colectivos o como líder de un equipo, que logros netamente individuales',
    'Siempre puedo aprender de mis compañeros'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 0;
  copy = this.copys[this.index];
  rptasEquipo = Array();
  progress = 0.9126;
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
        this.rptasEquipo[this.index] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEquipo);
      }
    });
  }

  continuar() {
    if (this.rptasEquipo[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEquipo);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasEquipo, 19);
        this.app.promedioDimension('Trabajo en equipo', this.rptasEquipo);
        this.app.navegarA('/questionary/negociacion');
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
