import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@shared/shared.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
