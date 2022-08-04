import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-autoeficacia',
  templateUrl: './autoeficacia.component.html',
  styleUrls: ['./autoeficacia.component.scss'],
})
export class AutoeficaciaComponent implements OnInit {
  copys = [
    'Identifico cuándo y cómo hacer uso de mis capacidades en el desarrollo de un proyecto emprendedor.',
    'Se me facilita mejorar mis habilidades para asumir actividades que en un principio no sé cómo hacer.',
    'Identifico mi falta de conocimiento y busco la forma de aprender.',
    'Tengo la capacidad de organizame y hacer lo necesario para alcanzar mis metas.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasAuto = Array();
  progreso = Array(18).fill('virtual', 0, 18);

  constructor(private app: AppComponent) {}

  seleccionar(event, opc) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasAuto[this.index - 1] = parseFloat(event.srcElement.value);
        console.log(this.rptasAuto);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasAuto[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasAuto);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasAuto, 0);
        this.app.promedioDimension(this.rptasAuto, 0);
        this.app.navegarA('/questionary/control');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyAutoeficacia: HTMLElement =
              document.getElementById('copyAutoeficacia');
            this.index++;
            copyAutoeficacia.textContent = this.copys[this.index - 1];
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
