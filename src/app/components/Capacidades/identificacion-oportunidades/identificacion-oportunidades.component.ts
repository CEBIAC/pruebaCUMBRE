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

  index = 1;
  rptasOportunidades = Array();
  progress = 0.329;
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
        this.rptasOportunidades[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasOportunidades);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasOportunidades[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasOportunidades);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasOportunidades, 7);
        this.app.promedioDimension(this.rptasOportunidades, 7);
        this.app.navegarA('/questionary/flexibilidad');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyOportunidades: HTMLElement =
              document.getElementById('copyOportunidades');
            this.index++;
            copyOportunidades.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
