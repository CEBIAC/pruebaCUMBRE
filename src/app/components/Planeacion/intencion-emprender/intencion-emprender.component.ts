import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-intencion-emprender',
  templateUrl: './intencion-emprender.component.html',
  styleUrls: ['./intencion-emprender.component.scss'],
})
export class IntencionEmprenderComponent implements OnInit {

  copys = ['Cuando pienso en generar ingresos, me atrae más hacerlo a través de un proyecto de emprendimiento propio que por medio de un mejor empleo.',
    'Sólo espero el momento en que pueda iniciar mi emprendimiento, para ser independiente.',
    'Constantemente evalúo mi entorno con el fin de encontrar una oportunidad para desarrollar un proyecto de emprendimiento.',
    'Cuando escucho historias de emprendedores, sólo me imagino el momento en el que yo esté contando la mía.'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 0;
  copy = this.copys[this.index];
  rptasEmprender = Array();
  progress = 0.6084;
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
        this.rptasEmprender[this.index] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEmprender);
      }
    });
  }

  continuar() {
    if (this.rptasEmprender[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEmprender);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasEmprender, 13);
        this.app.promedioDimension('Intencion de Emprender', this.rptasEmprender);
        this.app.navegarA('/questionary/planicacion');
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
