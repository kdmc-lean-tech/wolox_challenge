import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldComponent),
      multi: true
    }
  ]
})
export class SearchFieldComponent implements ControlValueAccessor {
  public searchValue = '';
  @Input() placeholder = 'Search';
  public disabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  public onDebouncedInput(value: string): void {
    this.onChange(value);
  }

  writeValue(value: string) {
    if (value) {
      this.searchValue = value;
    } else {
      this.searchValue = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.registerOnTouched = fn;
  }
}
