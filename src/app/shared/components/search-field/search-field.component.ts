import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {

  public searchValue = '';
  private lastEmittedValue: string;

  @Input() placeholder = 'Search';
  @Input() set value(value: string) {
    this.searchValue = value || '';
    this.lastEmittedValue = this.searchValue;
  }
  @Output() valueChanged = new EventEmitter<string>();

  public onDebouncedInput(value: string): void {
    if (value !== this.lastEmittedValue) {
      this.valueChanged.emit(value);
      this.lastEmittedValue = value;
    }
  }
}
