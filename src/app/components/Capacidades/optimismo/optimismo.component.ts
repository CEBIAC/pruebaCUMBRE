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

  index = 0;
  copy = this.copys[this.index];
  rptasOpt = Array();
  progress = 0.0963;

  constructor(private app: AppComponent) {}

  seleccionar(event) {
    this.opciones.forEach((element, index) => {
      let elmnt: HTMLElement = document.getElementById(element[2]);
      elmnt.className = '';

      if (index == this.opciones.length - 1) {
        const select: HTMLElement = document.getElementById(
          event.srcElement.id
        );
        select.className = 'actived';
        this.rptasOpt[this.index] = parseFloat(event.srcElement.value);
        console.log(this.rptasOpt);
      }
    });
  }

  continuar() {
    if (this.rptasOpt[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasOpt);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasOpt, 2);
        this.app.promedioDimension('Optimismo', this.rptasOpt);
        this.app.navegarA('/questionary/persistencia');
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
