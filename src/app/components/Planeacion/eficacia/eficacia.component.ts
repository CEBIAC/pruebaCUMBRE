import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-eficacia',
  templateUrl: './eficacia.component.html',
  styleUrls: ['./eficacia.component.scss'],
})
export class EficaciaComponent implements OnInit {

  copys = ['Resultados de alta calidad son preferibles a resultados numerosos.',
    'Presto atención a cada detalle de los procesos que llevo.',
    'Cumplo mis objetivos con resultados sobresalientes.',
    'Si hay escasos recursos es mejor lograr pocos productos perfectos o varios de poca calidad.'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasEficacia = Array();
  progress = 0.819;
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
        this.rptasEficacia[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEficacia);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasEficacia[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEficacia);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasEficacia, 17);
        this.app.promedioDimension(this.rptasEficacia, 17);
        this.app.navegarA('/questionary/relaciones');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyEficacia: HTMLElement =
              document.getElementById('copyEficacia');
            this.index++;
            copyEficacia.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}


}
