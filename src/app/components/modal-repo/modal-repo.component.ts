import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-repo',
  templateUrl: './modal-repo.component.html',
  styleUrls: ['./modal-repo.component.scss'],
})
export class ModalRepoComponent implements OnInit {
  @Input('search') search;
  repos = [];
  constructor(private router: Router, private modal: ModalController) {}

  ngOnInit() {
    this.repos = [...this.search];
    console.log(this.repos);
  }

  goToResult(index) {
    sessionStorage.setItem('user', JSON.stringify(this.repos[index]))
    sessionStorage.setItem('resultadosRepo', this.repos[index].resultados)
    sessionStorage.setItem('nameRepo', this.repos[index].nombre);
    sessionStorage.setItem('dateRepo', this.repos[index].fecha);
    this.modal.dismiss({
      dismissed: true,
    });
    this.router.navigate(['/results']);
  }
}
