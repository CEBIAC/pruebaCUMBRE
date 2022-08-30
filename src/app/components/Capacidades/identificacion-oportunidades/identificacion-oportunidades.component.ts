import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-identificacion-oportunidades',
  templateUrl: './identificacion-oportunidades.component.html',
  styleUrls: ['./identificacion-oportunidades.component.scss'],
})
export class IdentificacionOportunidadesComponent implements OnInit {
  copys = [
    'Se me dificulta identificar oportunidades de negocio en el contexto donde me desenvuelvo.',
    'Me cuesta identificar cuál es una buena oportunidad de negocio.',
    'Estoy atenta/o a las dinámicas de distintos sectores de la ciudad para distinguir oportunidades de emprendimiento.',
    'Reconozco las desventajas de la competencia para elaborar mis propias ventajas competitivas.',
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
  rptasOportunidades = Array();
  progress = 0.329;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasOportunidades[this.index] = parseFloat(event.srcElement.value);
    // console.log(this.rptasOportunidades)
  }

  continuar() {
    if (this.rptasOportunidades[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      // console.log(this.rptasOportunidades);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasOportunidades, 7);
        this.app.promedioDimension(
          'Identificacion de Oportunidades',
          this.rptasOportunidades
        );
        this.app.navegarA('/questionary/flexibilidad');
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
