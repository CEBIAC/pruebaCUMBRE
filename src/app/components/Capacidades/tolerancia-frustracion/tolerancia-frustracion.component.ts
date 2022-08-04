import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-tolerancia-frustracion',
  templateUrl: './tolerancia-frustracion.component.html',
  styleUrls: ['./tolerancia-frustracion.component.scss'],
})
export class ToleranciaFrustracionComponent implements OnInit {

  copys = [
    '.',
    '',
    '',
    '',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasTolerancia = Array();
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
        this.rptasTolerancia[this.index - 1] = parseFloat(event.srcElement.value);
        console.log(this.rptasTolerancia);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasTolerancia[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasTolerancia);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasTolerancia, 11);
        this.app.promedioDimension(this.rptasTolerancia, 11);
        this.app.navegarA('/questionary/logro');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyTolerancia: HTMLElement =
              document.getElementById('copyTolerancia');
            this.index++;
            copyTolerancia.textContent = this.copys[this.index - 1];
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
