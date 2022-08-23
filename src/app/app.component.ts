import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { SapiolabService } from 'src/app/services/sapiolab.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  respuestas = Array(75);
  respuestasDim = Array();
  promediosDim = Array();
  arrPlaneación = Array();
  arrSocial = Array();
  Capacidades;
  Planeación;
  Social;
  globalAverage;
  results;
  objProms = {
    Autoeficacia: 0,
    'Locus de control': 0,
    Optimismo: 0,
    Persistencia: 0,
    'Propension al Riesgo': 0,
    Autonomia: 0,
    Creatividad: 0,
    'Identificacion de Oportunidades': 0,
    Flexibilidad: 0,
    'Manejo de estres': 0,
    Resiliencia: 10,
    'Tolerancia a la frustracion': 10,
    'Orientacion al logro': 10,
    'Intencion de Emprender': 10,
    Planificacion: 10,
    Evaluacion: 10,
    Eficiencia: 10,
    Eficacia: 10,
    Relaciones: 10,
    'Trabajo en equipo': 10,
    Negociacion: 20,
    Capacidades: 20,
    Planeacion: 20,
    Social: 20,
    Global: 20,
  };
  user: User;

  constructor(private sapiolab: SapiolabService, public router: Router) {
    if (sessionStorage.getItem('respuestas')) {
      this.respuestasDim = JSON.parse(sessionStorage.getItem('respuestas'));
    }
  }

  respuestasDimsension(arr, index) {
    this.respuestasDim[index] = arr;
    sessionStorage.setItem('respuestas', JSON.stringify(this.respuestasDim));
    console.log(this.respuestasDim);
  }

  promedioDimension(key, array) {
    let dividend = key == 'Planificacion' ? 6 : 4
    const reducer = (prev, curr) => prev + curr;
    this.objProms[key] = String((array.reduce(reducer) / dividend).toFixed(2));
    console.log(this.arrPlaneación);
  }

  saveResults(answers, dimension, capacidades, planeacion, social, Average) {
    dimension.push(capacidades, planeacion, social, Average);
    console.log('dimension:', dimension);
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.user.respuestas = JSON.stringify(answers);
      this.user.resultados = JSON.stringify(dimension);
      this.sapiolab.saveResults(this.user);
    } else {
      alert('Error almacenando datos');
    }
  }

  navegarA(ruta) {
    this.router.navigate([ruta]);
  }
}
