import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SapiolabService } from 'src/app/services/sapiolab.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private sapiolab: SapiolabService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // sessionStorage.clear();
  }
  ngOnInit() {
    this.verificarURL();
  }

  verificarURL() {
    this.route.queryParams
      .subscribe((params) => {
        const query = params;
        this.sapiolab.verifyQuery(query);
      })
      .unsubscribe();
  }

  //Metodo para enviar a terms
  empezar() {
    this.route.queryParams
      .subscribe((params) => {
        const query = params;
        // console.log(query);
        this.sapiolab.checkQuery(query);
      })
      .unsubscribe();
    //this.router.navigateByUrl('/terms');
  }

  //Metodo para enviar a results
  resultados() {
    this.router.navigate(['/repository']);
  }
}
