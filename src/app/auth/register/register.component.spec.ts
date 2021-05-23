import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesService } from '@services/countries/countries.service';
import { TestCountriesService } from '@testing/services/countries/countries.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: CountriesService, useClass: TestCountriesService }
      ],
      imports: [
        AngularSvgIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
