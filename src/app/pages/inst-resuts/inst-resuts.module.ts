import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstResutsPageRoutingModule } from './inst-resuts-routing.module';

import { InstResutsPage } from './inst-resuts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstResutsPageRoutingModule
  ],
  declarations: [InstResutsPage]
})
export class InstResutsPageModule {}
