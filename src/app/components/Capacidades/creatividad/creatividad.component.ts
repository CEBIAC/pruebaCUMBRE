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

  index = 1;
  rptasCreatividad = Array();
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
        this.rptasCreatividad[this.index - 1] = parseFloat(event.srcElement.value);
        console.log(this.rptasCreatividad);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasCreatividad[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasCreatividad);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasCreatividad, 6);
        this.app.promedioDimension(this.rptasCreatividad, 6);
        this.app.navegarA('/questionary/oportunidades');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyCreatividad: HTMLElement =
              document.getElementById('copyCreatividad');
            this.index++;
            copyCreatividad.textContent = this.copys[this.index - 1];
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
