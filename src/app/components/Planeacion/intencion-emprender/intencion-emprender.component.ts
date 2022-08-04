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

  index = 1;
  rptasEmprender = Array();
  progress = 0.6084;
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
        this.rptasEmprender[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEmprender);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasEmprender[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEmprender);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasEmprender, 13);
        this.app.promedioDimension(this.rptasEmprender, 13);
        this.app.navegarA('/questionary/planicacion');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyEmprender: HTMLElement =
              document.getElementById('copyEmprender');
            this.index++;
            copyEmprender.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}
}
