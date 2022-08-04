import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentificacionOportunidadesComponent } from './identificacion-oportunidades.component';

describe('IdentificacionOportunidadesComponent', () => {
  let component: IdentificacionOportunidadesComponent;
  let fixture: ComponentFixture<IdentificacionOportunidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificacionOportunidadesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentificacionOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
