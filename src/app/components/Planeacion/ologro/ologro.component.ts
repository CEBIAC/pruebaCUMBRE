import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { QuestionaryPage } from 'src/app/pages/questionary/questionary.page';

@Component({
  selector: 'app-ologro',
  templateUrl: './ologro.component.html',
  styleUrls: ['./ologro.component.scss'],
})
export class OlogroComponent implements OnInit {
  
  copys = [
    'Me motiva lo que hago a diario porque cada actividad me acerca a cumplir mis objetivos.',
    'Tengo claras mis metas a pesar de los desafíos que se me presenten en mi proyecto.',
    'Puedo superar todos los desafios que se me presenten, hasta alcanzar los objetivos que me propongo.',
    'Me siento cómodo asumiendo retos nuevos en pro de cumplir con mis objetivos.',
  ];

  opciones = [
    ['Totalmente en desacuerdo', '1', 'opt1'],
    ['En desacuerdo', '2', 'opt2'],
    ['Ni de acuerdo ni desacuerdo', '3', 'opt3'],
    ['De acuerdo', '4', 'opt4'],
    ['Totalmente de acuerdo', '5', 'opt5'],
  ];

  index = 1;
  rptasLogro = Array();
  progress = 0.5616;
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
        this.rptasLogro[this.index - 1] = parseFloat(event.srcElement.value);
        //console.log(this.rptasLogro);
      }
    });
  }

  iniciar() {
    this.index++;
  }

  continuar() {
    if (this.rptasLogro[this.index - 1] == undefined) {
      alert('Selecciona una opción para continuar');
    } else {
      //console.log(this.rptasLogro);
      if (this.index == 0 + this.copys.length) {
        this.app.respuestasDimsension(this.rptasLogro, 12);
        this.app.promedioDimension(this.rptasLogro, 12);
        this.app.navegarA('/questionary/emprender');
      } else {
        this.opciones.forEach((element, index) => {
          let elmnt: HTMLElement = document.getElementById(element[2]);
          elmnt.className = '';
          if (index == this.opciones.length - 1) {
            const copyLogro: HTMLElement =
              document.getElementById('copyLogro');
            this.index++;
            copyLogro.textContent = this.copys[this.index - 1];
            this.progress = this.progress + 0.0117;
          }
        });
      }
    }
  }

  ngOnInit() {}
}
