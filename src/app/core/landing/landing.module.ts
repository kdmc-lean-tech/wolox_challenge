import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '@core/landing/landing.component';
import { LandingRoutingModule } from '@core/landing/landing-routing.module';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
