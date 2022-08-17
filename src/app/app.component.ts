import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { SapiolabService } from 'src/app/services/sapiolab.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  respuestas = Array(75)
  respuestasDim = Array()
  promediosDim = Array()
  arrPlaneación = Array();
  arrSocial = Array();
  Capacidades;
  Planeación;
  Social;
  globalAverage;
  results;

  constructor(private sapiolab: SapiolabService, public router: Router) { }
  user: User;
  respuestasDimsension(arr, index) {
    this.respuestasDim[index] = arr;
    //console.log(this.respuestasDim)
  }

  promedioDimension(arr, index) {
    const reducer = (prev, curr) => prev + curr;
    let promedioDim = 0;
    if (index == 14) {
      promedioDim = arr.reduce(reducer) / 6;
      this.promediosDim[index] = parseInt(promedioDim.toFixed(2));
      this.arrPlaneación[index - 12] = arr.reduce(reducer) / 6;
      console.log(this.arrPlaneación)
    } else {
      promedioDim = arr.reduce(reducer) / 4;
      this.promediosDim[index] = parseInt(promedioDim.toFixed(2));
      if (index == 11) {
        this.Capacidades = this.promediosDim.reduce(reducer) / 12;
        this.Capacidades = this.Capacidades.toFixed(2);
        console.log(this.Capacidades)
      } else if (index > 11 && index <= 17) {
        this.arrPlaneación[index - 12] = arr.reduce(reducer) / 4;
        console.log(this.arrPlaneación)
        if (index == 17) {
          this.Planeación = this.arrPlaneación.reduce(reducer) / 6;
          this.Planeación = this.Planeación.toFixed(2);
          console.log(this.arrPlaneación,this.Planeación)
        }
      } else if (index > 17) {
        this.arrSocial[index - 18] = arr.reduce(reducer) / 4;
        console.log(this.arrSocial)
        if (index == 20) {
          //console.log(this.promediosDim)
          this.Social = this.arrSocial.reduce(reducer) / 3;
          this.Social = this.Social.toFixed(2);
          this.globalAverage = this.promediosDim.reduce(reducer) / 21;
          this.globalAverage = this.globalAverage.toFixed(2);
          console.log(this.arrSocial,this.Social, this.globalAverage)
          this.saveResults(this.respuestasDim, this.promediosDim,this.Capacidades,this.Planeación,this.Social,this.globalAverage)
        }
      }

    }
  }


  saveResults(answers, dimension,capacidades,planeacion,social, Average) {
    dimension.push(capacidades,planeacion,social, Average);
    console.log('dimension:', dimension)
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.user.respuestas = JSON.stringify(answers);
      this.user.resultados = JSON.stringify(dimension);
      this.sapiolab.saveResults(this.user);
      this.sapiolab.checkRepo(this.user.documento);
    } else {
      alert('Error almacenando datos');
    }

  }



  navegarA(ruta) {
    this.router.navigate([ruta])
  }
}

