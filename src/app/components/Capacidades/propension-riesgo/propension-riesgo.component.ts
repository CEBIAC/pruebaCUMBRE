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

  index = 0;
  copy = this.copys[this.index];
  select;
  rptasRiesgo = Array();
  progress = 0.187;

  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasRiesgo[this.index] = parseFloat(event.srcElement.value);
    // console.log(this.rptasRiesgo)
  }

  continuar() {
    if (this.rptasRiesgo[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      // console.log(this.rptasRiesgo);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasRiesgo, 4);
        this.app.promedioDimension('Propension al Riesgo', this.rptasRiesgo);
        this.app.navegarA('/questionary/autonomia');
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
