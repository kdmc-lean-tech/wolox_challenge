import { Component, Input, ElementRef } from '@angular/core';

// tslint:disable: variable-name
@Component({
  selector: 'app-select-field-option',
  template: '<ng-content></ng-content>',
})
export class SelectFieldOptionComponent {
  @Input() value: any;
  /** The value value provided inside the option */
  get viewValue(): string {
    return (this._getHostElement().textContent || '').trim();
  }
  constructor(private _element: ElementRef<HTMLElement>) { }

  /** Gets the host DOM element. */
  private _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
