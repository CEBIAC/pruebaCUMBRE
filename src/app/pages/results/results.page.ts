import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  sections;

  constructor(private router: Router) {
    this.sections = 0;
  }

  ngOnInit() {}

  //Metodo para enviar a results
  goNext() {
    this.sections += 1;
  }
}
