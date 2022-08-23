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
    'Si me percato que algo está saliendo mal con mi proyecto, asumo con tranquilidad la carga de resolverlo a pesar de sentirme desanimado.',
    'Normalmente en una situación negativa, controlo mis emociones y actúo con cabeza fría.',
    'Puedo mantener el ritmo y el control de mis actividades sin dejar que las derrotas afecten el proceso.',
    'Soy consciente que mi idea de negocio no siempre pueda ser aceptada y no me dejo frustrar por el rechazo.',
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
  rptasTolerancia = Array();
  progress = 0.5148;
  constructor(private app: AppComponent, private adap: QuestionaryPage) { }

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasTolerancia[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasTolerancia);
      }
    });
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
