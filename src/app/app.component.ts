import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  respuestas = Array(75)
  respuestasDim = Array()
  promediosDim = Array()
  promediosDom = Array(3)
  arrFlexibilidad = Array()
  arrAdaptabilidad = Array()
  arrConocimiento = Array()
  arrAgilidad = Array()
  arrDigital = Array()
  autoeficacia;
  autonomia;
  creatividad;
  oportunidades;
  control;
  estres;
  optimismo;
  persistencia;
  riesgo;
  resiliencia;
  frustracion;
  eficacia;
  eficiencia;
  evaluacion;
  emprender;
  logro;
  planificacion;
  negociacion;
  relaciones;
  equipo;
  mtzRadarDominio;
  mtzRadarDimension;
  widthImage;
  heigthImage;

  constructor(public router: Router) {}

  respuestasDimsension(arr, index) {
    this.respuestasDim[index] = arr;
    console.log(this.respuestasDim)
  }

  promedioDimension(arr, index) {
    const reducer = (prev, curr) => prev + curr;
    let promedioDim = arr.reduce(reducer) / 4;
    this.promediosDim[index] = promedioDim.toFixed(2);
    console.log(this.promediosDim)
  }

  navegarA(ruta) {
    this.router.navigate([ruta])
  }
}

