import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '@core/landing/landing.component';
import { LandingRoutingModule } from '@core/landing/landing-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { BenefitsComponent } from './benefits/benefits.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    BenefitsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
