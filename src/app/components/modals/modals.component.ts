import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import {
  Animation,
  AnimationController,
  createAnimation,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit {
  @Input() dataType: string;
  usuario = this.formBuilder.group({
    terms: [false, [Validators.requiredTrue]]
  });
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private animationCtrl: AnimationController,
    public http: HttpClient
  ) {}



  ngOnInit() {
    
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
