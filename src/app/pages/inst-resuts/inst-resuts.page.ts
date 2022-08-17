import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SapiolabService } from 'src/app/services/sapiolab.service';
@Component({
  selector: 'app-inst-resuts',
  templateUrl: './inst-resuts.page.html',
  styleUrls: ['./inst-resuts.page.scss'],
})
export class InstResutsPage implements OnInit {
  stateSelect = false;
  stateDefaultSelect = false;

  cc: any;
  usuario = this.formBuilder.group({
    documento: [
      '',
      [Validators.min(1000), Validators.required, Validators.pattern('[0-9]+')],
    ],
  });

  constructor(
    private sapiolab: SapiolabService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {}
  async guardarDatos(login: any) {
    if (this.usuario.value.documento == undefined) {
      alert('Ingresa un número de identificación');
    } else {
      this.sapiolab.checkRepo(this.usuario.value.documento);
      sessionStorage.setItem(
        'idRepo',
        JSON.stringify(this.usuario.value.documento)
      );
      //this.router.navigateByUrl('/instructions');
    }
  }
}
