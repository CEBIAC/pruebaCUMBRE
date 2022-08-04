import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-propension-riesgo',
  templateUrl: './propension-riesgo.component.html',
  styleUrls: ['./propension-riesgo.component.scss'],
})
export class PropensionRiesgoComponent implements OnInit {

  copys = [
    'Me atemoriza emprender un negocio porque podría perder dinero.',
    'El contexto empresarial es muy arriesgado para emprender un negocio.',
    'No me detengo por inseguridades al momento de tomar acción para emprender.',
    'Soy muy precavido a la hora de asumir riesgos.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasRiesgo = Array();
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
        this.rptasRiesgo[this.index - 1] = parseFloat(event.srcElement.value);
        console.log(this.rptasRiesgo);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasRiesgo[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasRiesgo);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasRiesgo, 4);
        this.app.promedioDimension(this.rptasRiesgo, 4);
        this.app.navegarA('/questionary/autonomia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyRiesgo: HTMLElement =
              document.getElementById('copyRiesgo');
            this.index++;
            copyRiesgo.textContent = this.copys[this.index - 1];
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
