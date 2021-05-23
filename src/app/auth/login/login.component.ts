import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from '@shared/utils/validators/custom-form-validators.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      email: new FormControl('', [ Validators.required, emailValidator ]),
      password: new FormControl('', [ Validators.required ])
    });
  }

  public get email() {
    return this.form.get('email') as FormControl;
  }

  public get password() {
    return this.form.get('password') as FormControl;
  }

  public goToRegister() {
    this.router.navigate(['/accounts/register']);
  }

  public onSubmit() {
  }
}
