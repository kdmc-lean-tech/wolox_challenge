import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '@auth/auth.component';
import { RegisterComponent } from '@auth/register/register.component';
import { TermsConditionsComponent } from '@auth/terms-conditions/terms-conditions.component';
import { RegisterGuard } from '@guards/register.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RegisterGuard]
      },
      {
        path: 'conditions',
        component: TermsConditionsComponent,
        canActivate: [RegisterGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
