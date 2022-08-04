import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.page.html',
  styleUrls: ['./questionary.page.scss'],
})
export class QuestionaryPage implements OnInit {
  copys = [
    'Identifico cuándo y cómo hacer uso de mis capacidades en el desarrollo de un proyecto emprendedor.',
    'Se me facilita mejorar mis habilidades para asumir actividades que en un principio no sé cómo hacer.',
    'Identifico mi falta de conocimiento y busco la forma de aprender.',
    'Tengo la capacidad de organizame y hacer lo necesario para alcanzar mis metas.',
  ];
  opciones = [
    ['Totalmente en desacuerdo', '1'],
    ['En desacuerdo', '2'],
    ['Ni de acuerdo ni desacuerdo', '3'],
    ['De acuerdo', '4'],
    ['Totalmente de acuerdo', '5'],
  ];

  index = 6;
  rptasOrg = Array(5);
  progreso = Array(18).fill('virtual', 0, 18);

  constructor() {}

  seleccionar(event, opc) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[0]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasOrg[this.index - 7] = parseFloat(event.srcElement.value);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasOrg[this.index - 7] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasOrg);
      if (this.index == 6 + this.copys.length) {
        /*this.app.respuestasDimsension(this.rptasOrg, 4);
        this.app.promedioDimension(this.rptasOrg, 4);
        this.app.navegarA('/adaptabilidad/productivo');*/
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[0]);
          elmnt.className = '';

          if (index == this.opciones.length - 1) {
            const copyOrganigrama: HTMLElement = document.getElementById('copyOrganigrama');
            this.index++;
            copyOrganigrama.textContent = this.copys[this.index - 7];
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
