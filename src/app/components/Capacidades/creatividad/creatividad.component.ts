import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-creatividad',
  templateUrl: './creatividad.component.html',
  styleUrls: ['./creatividad.component.scss'],
})
export class CreatividadComponent implements OnInit {
  copys = [
    'Me cuesta trabajo generar ideas innovadoras que me permitan estar por encima de la competencia.',
    'Me gusta poner a prueba mi imaginación experimentando constantemente con nuevas combinaciones de ideas.',
    'Acostumbro a seguir la forma tradicional de hacer las cosas.',
    'Cuando tengo problemas en mi trabajo, busco soluciones que hayan implementado otros y las imito.',
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
  rptasCreatividad = Array();
  progress = 0.282;

  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasCreatividad[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasCreatividad)
  }

  continuar() {
    if (this.rptasCreatividad[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasCreatividad);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasCreatividad, 6);
        this.app.promedioDimension('Creatividad', this.rptasCreatividad);
        this.app.navegarA('/questionary/oportunidades');
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
