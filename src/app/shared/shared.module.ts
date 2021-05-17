import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '@shared/components/button/button.component';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule,
    ButtonComponent
  ]
})
export class SharedModule { }
