import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { SelectFieldOptionComponent } from '@shared/components/select-field/select-field-option/select-field-option.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { DebounceInputDirective } from '@shared/directives/debounce-input.directive';
import { TechCardComponent } from './components/tech-card/tech-card.component';
import { ImgFallbackDirective } from '@shared/directives/img-fallback.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    SelectFieldOptionComponent,
    SearchFieldComponent,
    DebounceInputDirective,
    SearchFieldComponent,
    TechCardComponent,
    ImgFallbackDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule,
    ButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    SelectFieldOptionComponent,
    DebounceInputDirective,
    SearchFieldComponent,
    TechCardComponent,
    ImgFallbackDirective
  ]
})
export class SharedModule { }
