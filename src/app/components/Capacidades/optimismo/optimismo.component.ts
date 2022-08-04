import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-optimismo',
  templateUrl: './optimismo.component.html',
  styleUrls: ['./optimismo.component.scss'],
})
export class OptimismoComponent implements OnInit {
  copys = [
    'Enfrento con una actitud positiva toda situación adversa que se intervenga en mis objetivos.',
    'A pesar de que no siempre las cosas salen bien, constantemente espero lo mejor de mi para lograr el éxito en lo que me propongo.',
    'Cuando algo apunta a salir mal, siempre antes de renunciar prefiero explorar alternativas para solucionarlo de alguna forma sin dejar de intentar.',
    'Actúo convencida/o de que todo saldrá bien sin importar la magnitud de las dificultades.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasAuto = Array();
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
        this.rptasAuto[this.index - 1] = parseFloat(event.srcElement.value);
        console.log(this.rptasAuto);
      }
    });
  }

  iniciar() {
    this.index++;
    this.progreso[this.index - 1] = 'virtual';
    this.progreso[this.index] = 'actual';
  }

  continuar() {
    if (this.rptasAuto[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasAuto);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasAuto, 2);
        this.app.promedioDimension(this.rptasAuto, 2);
        this.app.navegarA('/questionary/persistencia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyOptimismo: HTMLElement =
              document.getElementById('copyOptimismo');
            this.index++;
            copyOptimismo.textContent = this.copys[this.index - 1];
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
