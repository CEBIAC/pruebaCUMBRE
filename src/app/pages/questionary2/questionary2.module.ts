import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Questionary2PageRoutingModule } from './questionary2-routing.module';

import { Questionary2Page } from './questionary2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Questionary2PageRoutingModule
  ],
  declarations: [Questionary2Page]
})
export class Questionary2PageModule {}
