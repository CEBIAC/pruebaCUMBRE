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

  index = 0;
  copy = this.copys[this.index];
  select;
  rptasResiliencia = Array();
  progress = 0.468;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasResiliencia[this.index] = parseFloat(event.srcElement.value);
    //console.log(this.rptasResiliencia)
  }

  continuar() {
    if (this.rptasResiliencia[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasResiliencia);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasResiliencia, 10);
        this.app.promedioDimension('Resiliencia', this.rptasResiliencia);
        this.app.navegarA('/questionary/tolerancia');
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
