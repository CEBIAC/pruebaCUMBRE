import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../interfaces/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  stateSelect = false;
  stateDefaultSelect = false;

  cc: any;
  usuario = this.formBuilder.group({
    nombre: [
      '',
      [
        Validators.minLength(3),
        Validators.required,
        Validators.pattern('[a-zA-ZÀ-ž ]+'),
      ],
    ],
    documento: [
      '',
      [Validators.min(1000), Validators.required, Validators.pattern('[0-9]+')],
    ],
    email: ['', [Validators.email, Validators.required]],
  });
  user: User = {
    nombre: '',
    documento: '',
    correo: '',
    uid: '',
    respuestas: '',
    resultados: '',
  };
  constructor(private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() { }

  async guardarDatos(login: any) {

    this.user = {
      nombre: this.usuario.value.nombre,
      documento: this.usuario.value.documento,
      correo: this.usuario.value.email,
      uid: '',
      respuestas: '',
      resultados: '',
    };
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigateByUrl('/instructions');
    
    /*sessionStorage.setItem('Cedula', this.user.documento);
    var userId = false;
    const user = this.db.getUserData(String(datos.Cedula));
    await user.then(function (doc) {
      if (doc.exists) {
        userId = true;
      } else {
        userId = false;
        console.log(userId);
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    });

    if (userId == false) {
      this.db.addDatos(datos, String(datos.Cedula));
      this.router.navigate(['/welcome']);
    } else if (userId == true) {
      this.openLogin(login);
    }*/
    //console.log(datos, typeof(datos));
  }
}
