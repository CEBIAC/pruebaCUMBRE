import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  //Metodo para enviar a terms
  empezar() {
    this.router.navigateByUrl('/terms');
  }

  //Metodo para enviar a results
  resultados() {
    this.router.navigateByUrl('/inst-resuts');
  }
}
