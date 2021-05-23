import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { SelectFieldOptionComponent } from '@shared/components/select-field/select-field-option/select-field-option.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    SelectFieldOptionComponent
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
    ButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    SelectFieldOptionComponent
  ]
})
export class SharedModule { }
