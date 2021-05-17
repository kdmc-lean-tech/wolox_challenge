import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from '@layouts/layouts.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@core/landing/landing.module')
          .then(m => m.LandingModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@core/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
