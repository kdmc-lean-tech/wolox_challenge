import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services/auth/auth.service';
import { CountriesService } from '@services/countries/countries.service';
import { SessionService } from '@services/session/session.service';
import { TestAuthService } from '@testing/services/auth/test-auth.service';
import { TestCountriesService } from '@testing/services/countries/countries.service';
import { TestSessionService } from '@testing/services/session/test-session.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let countriesService: CountriesService;
  let sessionService: SessionService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        FormBuilder,
        { provide: CountriesService, useClass: TestCountriesService },
        { provide: AuthService, useClass: TestAuthService },
        { provide: SessionService, useClass: TestSessionService }
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
  }));

  beforeEach(() => {
    countriesService = TestBed.inject(CountriesService);
    sessionService = TestBed.inject(SessionService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountries method', () => fakeAsync(() => {
    const getCountriesSpy = spyOn(countriesService, 'getCountries');
    component.ngOnInit();
    tick();
    expect(getCountriesSpy).toHaveBeenCalled();
  }));

  it('should set province control', fakeAsync(() => {
    component.ngOnInit();
    const countryControl = component.form.get('country');
    const provinceControl = component.form.get('province');
    countryControl.setValue('Colombia');
    tick();
    expect(provinceControl.value).toBe('Cali');
  }));

  describe('Form Validations', () => {
    let nameControl: AbstractControl;
    let lastNameControl: AbstractControl;
    let countryControl: AbstractControl;
    let provinceControl: AbstractControl;
    let emailControl: AbstractControl;
    let phoneControl: AbstractControl;
    let passwordControl: AbstractControl;
    let verifyPasswordControl: AbstractControl;
    let conditionsControl: AbstractControl;

    beforeEach(() => {
      component.ngOnInit();
      nameControl = component.form.get('name');
      lastNameControl = component.form.get('lastName');
      countryControl = component.form.get('country');
      provinceControl = component.form.get('province');
      emailControl = component.form.get('email');
      phoneControl = component.form.get('phone');
      passwordControl = component.form.get('password');
      verifyPasswordControl = component.form.get('verifyPassword');
      conditionsControl = component.form.get('conditions');
    });

    it('should have all fields invalid on init', () => {
      expect(nameControl.invalid).toBeTruthy();
      expect(lastNameControl.invalid).toBeTruthy();
      expect(countryControl.invalid).toBeTruthy();
      expect(provinceControl.invalid).toBeTruthy();
      expect(emailControl.invalid).toBeTruthy();
      expect(phoneControl.invalid).toBeTruthy();
      expect(passwordControl.invalid).toBeTruthy();
      expect(verifyPasswordControl.invalid).toBeTruthy();
      expect(conditionsControl.invalid).toBeFalsy();
    });

    it('should return error minimum length required 6 for password and verifyPassword', () => {
      passwordControl.setValue('12345');
      verifyPasswordControl.setValue('12345');
      const errors = verifyPasswordControl.errors || {};
      expect(errors.minlength.requiredLength).toEqual(6);
    });

    it('should return email error', () => {
      emailControl.setValue('jessica@');
      const errors = emailControl.errors || {};
      expect(errors.email).toBe(`${emailControl.value} is not a valid email`);
    });

    it('should return true if password no match', () => {
      passwordControl.setValue('test1@example');
      verifyPasswordControl.setValue('test1@examp');
      expect(component.form.errors.nonEqualPasswords).toBeTruthy();
    });

    it('should return false if password match', () => {
      passwordControl.setValue('test1@example');
      verifyPasswordControl.setValue('test1@example');
      expect(component.form.errors.nonEqualPasswords).toBeFalsy();
    });

    it('should return error if name length is greater than 30', () => {
      nameControl.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      expect(nameControl.errors.maxlength.requiredLength).toEqual(30);
    });

    it('should return error if last name length is greater than 30', () => {
      lastNameControl.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      expect(lastNameControl.errors.maxlength.requiredLength).toEqual(30);
    });

    it('should return error if phone length greater than 10', () => {
      phoneControl.setValue('123456789104');
      expect(phoneControl.errors.maxlength.requiredLength).toEqual(10);
    });
  });

  it('should redirect to dashboard when user make submit', fakeAsync(() => {
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    component.onSubmit();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['dashboard']);
  }));

  it('should go to terms and condition page', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    component.goToTermsConditions();
    expect(routerSpy).toHaveBeenCalledWith(['accounts/conditions']);
  });
});
