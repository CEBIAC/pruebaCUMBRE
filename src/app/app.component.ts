import { SapiolabService } from './services/sapiolab.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  respuestas = Array(75).fill(0);
  respuestasDim: Array<any> = [];
  objProms = {
    Autoeficacia: '0',
    'Locus de control': '0',
    Optimismo: '0',
    Persistencia: '0',
    'Propension al Riesgo': '0',
    Autonomia: '0',
    Creatividad: '0',
    'Identificacion de Oportunidades': '0',
    Flexibilidad: '0',
    'Manejo de estres': '0',
    Resiliencia: '0',
    'Tolerancia a la frustracion': '0',
    'Orientacion al logro': '0',
    'Intencion de Emprender': '0',
    Planificacion: '0',
    Evaluacion: '0',
    Eficiencia: '0',
    Eficacia: '0',
    Relaciones: '0',
    'Trabajo en equipo': '0',
    Negociacion: '0',
    Capacidades: '0',
    Planeacion: '0',
    Social: '0',
    Global: '0',
  };
  user: User;

  constructor(private sapiolab: SapiolabService, public router: Router) {
    if (sessionStorage.getItem('respuestas')) {
      this.respuestasDim = JSON.parse(sessionStorage.getItem('respuestas'));
    }

    if (sessionStorage.getItem('promedios')) {
      this.objProms = JSON.parse(sessionStorage.getItem('promedios'));
    }
  }

  respuestasDimension(arr, index) {
    this.respuestasDim[index] = arr;
    sessionStorage.setItem('respuestas', JSON.stringify(this.respuestasDim));
    // console.log(this.respuestasDim);
  }

  promedioDimension(key, array) {
    let dividend = key == 'Planificacion' ? 6 : 4;
    const reducer = (prev, curr) => prev + curr;
    this.objProms[key] = (array.reduce(reducer) / dividend).toFixed(2);
    sessionStorage.setItem('promedios', JSON.stringify(this.objProms));

    if (key == 'Negociacion') {
      this.respuestas = this.respuestas.concat.apply([], this.respuestasDim);
      // console.log(this.respuestas);
      let capacidades = this.respuestas.slice(0, 12);
      let planeacion = this.respuestas.slice(12, 18);
      let social = this.respuestas.slice(18, 21);
      this.objProms.Capacidades = (capacidades.reduce(reducer) / 12).toFixed(2);
      this.objProms.Planeacion = (planeacion.reduce(reducer) / 6).toFixed(2);
      this.objProms.Social = (social.reduce(reducer) / 3).toFixed(2);
      this.objProms.Global = (this.respuestas.reduce(reducer) / 22).toFixed(2);
      sessionStorage.setItem('promedios', JSON.stringify(this.objProms));
      this.saveResults(this.respuestas, this.objProms);
    }
  }

  saveResults(respuestas, promedios) {
    // console.log('respuestas:', respuestas);
    // console.log('promedios:', promedios);
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.user.respuestas = JSON.stringify(respuestas);
      this.user.resultados = JSON.stringify(promedios);
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.sapiolab.saveResults(this.user);
    } else {
      alert('Error almacenando datos');
    }
  }

  navegarA(ruta) {
    this.router.navigate([ruta]);
  }
}
