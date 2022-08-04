import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalsComponent } from 'src/app/components/modals/modals.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  //Metodo para enviar a results
  goNext() {
    this.router.navigateByUrl('/login');
  }

  //presentar modal
  async presentModal(dataType) {
    const modal = await this.modalController.create({
      component: ModalsComponent,
      cssClass: 'wideModal',
      componentProps: { dataType: dataType },
      backdropDismiss: false,
    });

    return await modal.present();
  }
}
