import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-manejo-estres',
  templateUrl: './manejo-estres.component.html',
  styleUrls: ['./manejo-estres.component.scss'],
})
export class ManejoEstresComponent implements OnInit {
  copys = [
    'En los momentos cuando discuto con mis amigos, prefiero respirar y retomar la conversación cuando esté calmado.',
    'No logro solucionar problemas, ni trabajar cuando alguien está esperando los resultados.',
    'Reconozco cuando una situación es tensionante y puedo controlar mis reacciones para no dejarme afectar.',
    'Aunque trato de controlar mi estrés, no he podido encontrar técnicas de mantener la calma.',
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
  rptasEstres = Array();
  progress = 0.4212;
  constructor(private app: AppComponent) {}

  seleccionar(event, opt) {
    this.select = opt;
    this.rptasEstres[this.index] = parseFloat(event.srcElement.value);
    // console.log(this.rptasEstres)
  }

  continuar() {
    if (this.rptasEstres[this.index] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      // console.log(this.rptasEstres);
      if (this.index == this.copys.length - 1) {
        this.app.respuestasDimension(this.rptasEstres, 9);
        this.app.promedioDimension('Manejo de estres', this.rptasEstres);
        this.app.navegarA('/questionary/resiliencia');
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
