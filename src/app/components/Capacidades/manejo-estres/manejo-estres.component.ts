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

  index = 1;
  rptasEstres = Array();
  progress = 0.4212;
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
        this.rptasEstres[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasEstres);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasEstres[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasEstres);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasEstres, 9);
        this.app.promedioDimension(this.rptasEstres, 9);
        this.app.navegarA('/questionary/resiliencia');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyEstres: HTMLElement =
              document.getElementById('copyEstres');
            this.index++;
            copyEstres.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}

}
