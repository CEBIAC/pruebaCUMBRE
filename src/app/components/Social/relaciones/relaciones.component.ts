import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.scss'],
})
export class RelacionesComponent implements OnInit {
  copys = [
    'Siento que me privo de oportunidades porque soy muy tímido.',
    'Entre más enriquezca mi red de contactos con alianzas estratégicas, mayor será el potencial de sacar adelante mi proyecto.',
    'Recurro a información de prensa e internet para encontrar y aprovechar espacios donde pueda encontrar aliados, clientes o colaboradores.',
    'Se me dificulta relacionarme con personas que no conozco, prefiero establecer relaciones empresariales con conocidos.',
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
  rptasRelaciones = Array();
  progress = 0.8658;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasRelaciones[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasRelaciones)
  }

  continuar() {
    if (this.rptasRelaciones[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasRelaciones);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasRelaciones, 18);
        this.app.promedioDimension('Relaciones', this.rptasRelaciones);
        this.app.navegarA('/questionary/equipo');
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
