import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-resiliencia',
  templateUrl: './resiliencia.component.html',
  styleUrls: ['./resiliencia.component.scss'],
})
export class ResilienciaComponent implements OnInit {

  copys = [
    'Veo las situaciones difíciles como un reto para avanzar.',
    'Pienso que fracasar siempre es parte del proceso.',
    'Soy de las que reflexiona de los acontecimientos negativos que me ocurren, para sacar conclusiones y aprender de ellas.',
    'Busco entender lo positivo y negativo de cada decisión para mejorar los resultados de mis acciones.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasResiliencia = Array();
  progress = 0.468;
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
        this.rptasResiliencia[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasResiliencia);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasResiliencia[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasResiliencia);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasResiliencia, 10);
        this.app.promedioDimension(this.rptasResiliencia, 10);
        this.app.navegarA('/questionary/tolerancia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyResiliencia: HTMLElement =
              document.getElementById('copyResiliencia');
            this.index++;
            copyResiliencia.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
