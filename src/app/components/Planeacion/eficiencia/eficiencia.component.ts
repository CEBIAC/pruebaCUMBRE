import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-eficiencia',
  templateUrl: './eficiencia.component.html',
  styleUrls: ['./eficiencia.component.scss'],
})
export class EficienciaComponent implements OnInit {

  copys = ['Me gusta aplicar los mejores medios posibles con el fin de ahorrar tiempo en la obtención resultados.',
    'En todo proceso de trabajo prefiero asegurarme que estoy invirtiendo la mínima cantidad de tiempo y recursos.',
    'Los resultados de calidad son importantes siempre y cuando se reduzca en lo posible los recursos y tiempos de entrega.',
    'La calidad minuciosa de los resultados pasa a un segundo plano cuando éstos se pueden alcanzar rápida y económicamente.'];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasEficiencia = Array();
  progress = 0.7722;
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
        this.rptasEficiencia[this.index - 1] = parseFloat(
          event.srcElement.value
        );
        //console.log(this.rptasEficiencia);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasEficiencia[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEficiencia);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasEficiencia, 16);
        this.app.promedioDimension(this.rptasEficiencia, 16);
        this.app.navegarA('/questionary/eficacia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyEficiencia: HTMLElement =
              document.getElementById('copyEficiencia');
            this.index++;
            copyEficiencia.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}


}
