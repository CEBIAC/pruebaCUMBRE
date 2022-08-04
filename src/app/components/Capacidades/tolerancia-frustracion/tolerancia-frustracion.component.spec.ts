import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToleranciaFrustracionComponent } from './tolerancia-frustracion.component';

describe('ToleranciaFrustracionComponent', () => {
  let component: ToleranciaFrustracionComponent;
  let fixture: ComponentFixture<ToleranciaFrustracionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToleranciaFrustracionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToleranciaFrustracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
