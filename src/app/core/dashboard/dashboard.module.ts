import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TechnologyListComponent } from './technology-list/technology-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, TechnologyListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
