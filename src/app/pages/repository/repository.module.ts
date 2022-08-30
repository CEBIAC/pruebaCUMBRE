import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RepositoryPageRoutingModule } from './repository-routing.module';

import { RepositoryPage } from './repository.page';
import { ModalRepoComponent } from 'src/app/components/modal-repo/modal-repo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RepositoryPageRoutingModule 
  ],
  declarations: [RepositoryPage, ModalRepoComponent]
})
export class RepositoryPageModule {}
