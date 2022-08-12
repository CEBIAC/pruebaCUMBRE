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
    } else {
      promedioDim = arr.reduce(reducer) / 4;
      this.promediosDim[index] = parseInt(promedioDim.toFixed(2));
      if (index == 11) {
        this.Capacidades = this.promediosDim.reduce(reducer) / 12;
        this.Capacidades = this.Capacidades.toFixed(2);
      } else if (index > 11 && index <= 17) {
        this.arrPlaneación[index - 11] = arr.reduce(reducer) / 4;
        if (index == 17) {
          this.Planeación = this.promediosDim.reduce(reducer) / 6;
          this.Planeación = this.Planeación.toFixed(2);
        }
      } else if (index > 17) {
        this.arrSocial[index - 17] = arr.reduce(reducer) / 4;
        if (index == 20) {
          //console.log(this.promediosDim)
          this.Social = this.arrSocial.reduce(reducer) / 3;
          this.Social = this.Social.toFixed(2);
          this.globalAverage = this.promediosDim.reduce(reducer) / 21;
          this.globalAverage = this.globalAverage.toFixed(2);
          this.saveResults(this.respuestasDim, this.promediosDim,this.Capacidades,this.Planeación,this.Social,this.globalAverage)
        }
      }

    }
  }


  saveResults(answers, dimension,capacidades,planeacion,social, Average) {
    this.results = dimension.push(capacidades,planeacion,social,Average);
    console.log(this.results)
    /*if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.user.respuestas = JSON.stringify(answers);
      this.user.resultados = JSON.stringify(this.results);
      this.sapiolab.saveResults(this.user);
    } else {
      alert('Error almacenando datos');
    }*/


  }



  navegarA(ruta) {
    this.router.navigate([ruta])
  }
}

