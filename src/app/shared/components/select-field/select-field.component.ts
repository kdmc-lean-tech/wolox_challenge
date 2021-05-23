import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
  AfterContentInit,
  OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectFieldOptionComponent } from './select-field-option/select-field-option.component';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectFieldComponent,
    multi: true,
  }],
})
export class SelectFieldComponent implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {
  @ContentChildren(SelectFieldOptionComponent) options: QueryList<SelectFieldOptionComponent>;
  @ViewChild('selected') selected: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('menuContainer') menuContainer: ElementRef;
  @ViewChild('icon') icon: ElementRef;
  @Input() placeholder = 'Choose an option';
  @Input() label: string;
  @Input() isDisabled = false;
  @Input() width = '100%';
  public temporalValue: any;
  public visibleMenu = false;
  public selectedOption: SelectFieldOptionComponent;
  public selectedOptionIdx: number;
  private subscriptions = new Subscription();

  onChange = (_?: any) => { };
  onTouched = (_?: any) => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.visibleMenu = false;
    if (this.temporalValue) {
      this.findSelectedOption(this.temporalValue);
      this.temporalValue = undefined;
    }
    this.subscriptions.add(
      this.options.changes.subscribe(options => {
        this.options = options;
        this.findSelectedOption(this.temporalValue);
      })
    );
  }

  @HostListener('window:click', ['$event'])
  visibleMenuControl(event) {
    if (!this.isDisabled) {
      const isClickInsideMenuContainer = this.menuContainer.nativeElement.contains(event.target);
      const isClickInsideSelected = this.selected.nativeElement.contains(event.target);
      const isClickInsideIcon = this.icon.nativeElement.contains(event.target);
      this.validateClickInDocument(isClickInsideMenuContainer, isClickInsideSelected, isClickInsideIcon);
    } else {
      this.visibleMenu = false;
    }
  }

  private validateClickInDocument(
    isClickInsideMenuContainer, isClickInsideSelected, isClickInsideIcon) {
      if (!isClickInsideMenuContainer && (isClickInsideSelected || isClickInsideIcon)) {
        this.visibleMenu = true;
      } else if (!isClickInsideMenuContainer && (!isClickInsideSelected || !isClickInsideIcon)) {
        this.visibleMenu = false;
      } else {
        this.visibleMenu = false;
      }
  }

  writeValue(value: any): void {
    if (value) {
      this.temporalValue = value;
    } else {
      this.selectedOption = undefined;
      this.selectedOptionIdx = undefined;
    }
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.detectChanges();
  }

  public optionChanged(option: SelectFieldOptionComponent, i: number): void {
    this.selectedOption = option;
    this.selectedOptionIdx = i;
    this.onChange(option.value);
  }

  private findSelectedOption(value: any): void {
    let foundOption: SelectFieldOptionComponent;
    let foundOptionIdx: number;
    this.options.forEach((option, i) => {
      if (option.value === value) {
        foundOption = option;
        foundOptionIdx = i;
      }
    });
    if (foundOption) {
      this.selectedOption = foundOption;
      this.selectedOptionIdx = foundOptionIdx;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
