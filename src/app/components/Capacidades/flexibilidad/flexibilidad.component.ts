import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-flexibilidad',
  templateUrl: './flexibilidad.component.html',
  styleUrls: ['./flexibilidad.component.scss'],
})
export class FlexibilidadComponent implements OnInit {

  copys = [
    'Puedo amoldarme casi a cualquier situación que se presente sin problema.',
    'Prefiero seguir reglas concretas y bien establecidas que asumir procesos inciertos y desestructurados.',
    'Incorporo con facilidad distintas estrategias e ideas a mi emprendimiento aunque en principio no esté familiarizado con ellas.',
    'Me adapto fácilmente y sin mayor resistencia ante la incertidumbre y entornos cambiantes.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasFlexibilidad = Array();
  progress = 0.3744;
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
        this.rptasFlexibilidad[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasFlexibilidad);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasFlexibilidad[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasFlexibilidad);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasFlexibilidad, 8);
        this.app.promedioDimension(this.rptasFlexibilidad, 8);
        this.app.navegarA('/questionary/estres');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyFlexibilidad: HTMLElement =
              document.getElementById('copyFlexibilidad');
            this.index++;
            copyFlexibilidad.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}
}
