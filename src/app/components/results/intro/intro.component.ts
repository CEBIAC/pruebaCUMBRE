import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor(private router: Router, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadingCtrl.dismiss();
  }

  goNext() {
    this.router.navigate(['/results/vista1']);
  }
}
