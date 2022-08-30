import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-eficiencia',
  templateUrl: './eficiencia.component.html',
  styleUrls: ['./eficiencia.component.scss'],
})
export class EficienciaComponent implements OnInit {
  copys = [
    'Me gusta aplicar los mejores medios posibles con el fin de ahorrar tiempo en la obtención resultados.',
    'En todo proceso de trabajo prefiero asegurarme que estoy invirtiendo la mínima cantidad de tiempo y recursos.',
    'Los resultados de calidad son importantes siempre y cuando se reduzca en lo posible los recursos y tiempos de entrega.',
    'La calidad minuciosa de los resultados pasa a un segundo plano cuando éstos se pueden alcanzar rápida y económicamente.',
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
  rptasEficiencia = Array();
  progress = 0.7722;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasEficiencia[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasEficiencia)
  }

  continuar() {
    if (this.rptasEficiencia[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEficiencia);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasEficiencia, 16);
        this.app.promedioDimension('Eficiencia', this.rptasEficiencia);
        this.app.navegarA('/questionary/eficacia');
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
