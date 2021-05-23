import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBody } from '@models/user.model';
import { AuthService } from '@services/auth/auth.service';
import { CountriesService } from '@services/countries/countries.service';
import { SessionService } from '@services/session/session.service';
import { emailValidator } from '@shared/utils/validators/custom-form-validators.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public countries: string[] = [];
  public provinces: string[] = [];
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountries();
    this.listenChangesInCountry();
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      lastName: new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      country: new FormControl('', [ Validators.required ]),
      province: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required, emailValidator ]),
      phone: new FormControl('', [ Validators.required, Validators.maxLength(10) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
      verifyPassword: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
      conditions: new FormControl(false, [ Validators.required ])
    }, {
      validators: [
        this.validatePasswords,
        this.validateTermsAndConditions
      ]
    });
  }

  private validatePasswords(group: FormGroup) {
    return group.get('password').value === group.get('verifyPassword').value ?
      null : { nonEqualPasswords : true };
  }

  private validateTermsAndConditions(group: FormGroup) {
    return group.get('conditions').value === true ?
      null : { terms: true };
  }

  public get name() {
    return this.form.get('name') as FormControl;
  }

  public get lastName() {
    return this.form.get('lastName') as FormControl;
  }

  public get country() {
    return this.form.get('country') as FormControl;
  }

  public get province() {
    return this.form.get('province') as FormControl;
  }

  public get email() {
    return this.form.get('email') as FormControl;
  }

  public get phone() {
    return this.form.get('phone') as FormControl;
  }

  public get password() {
    return this.form.get('password') as FormControl;
  }

  public get verifyPassword() {
    return this.form.get('verifyPassword') as FormControl;
  }

  public get conditions() {
    return this.form.get('conditions') as FormControl;
  }

  private getCountries() {
    this.countries = this.countriesService.getCountries();
  }

  private listenChangesInCountry() {
    this.subscriptions.add(
      this.country.valueChanges.subscribe(country => {
        this.provinces = this.countriesService.getProvincesByCountry(country);
        if (this.provinces.length > 0) {
          this.province.setValue(this.provinces[0]);
        }
      })
    );
  }

  public onSubmit() {
    const body: UserBody = {
      name: this.name.value,
      lastName: this.lastName.value,
      phone: this.phone.value,
      password: this.password.value,
      email: this.email.value,
      country: this.country.value,
      province: this.province.value
    };
    this.authService.signup(body)
      .subscribe(({ token }) => {
        this.sessionService.setSessionData(token, body);
        this.form.reset();
        this.router.navigate(['dashboard']);
      });
  }

  public goToTermsConditions() {
    this.router.navigate(['accounts/conditions']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
