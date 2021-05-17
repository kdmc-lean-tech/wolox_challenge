import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    NgxPageScrollCoreModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule,
    NgxPageScrollCoreModule,
    ButtonComponent
  ]
})
export class SharedModule { }
