import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-eficacia',
  templateUrl: './eficacia.component.html',
  styleUrls: ['./eficacia.component.scss'],
})
export class EficaciaComponent implements OnInit {
  copys = [
    'Resultados de alta calidad son preferibles a resultados numerosos.',
    'Presto atención a cada detalle de los procesos que llevo.',
    'Cumplo mis objetivos con resultados sobresalientes.',
    'Si hay escasos recursos es mejor lograr pocos productos perfectos o varios de poca calidad.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 0;
  copy = this.copys[this.index];
  select;
  rptasEficacia = Array();
  progress = 0.819;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasEficacia[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasEficacia)
  }

  continuar() {
    if (this.rptasEficacia[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEficacia);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasEficacia, 17);
        this.app.promedioDimension('Eficacia', this.rptasEficacia);
        this.app.navegarA('/questionary/relaciones');
      } else {
        this.select = '';
        this.index++;
        this.copy = this.copys[this.index];
        this.progress = this.progress + 0.0117;
      }
    }
  }

  ngOnInit() {}
}
