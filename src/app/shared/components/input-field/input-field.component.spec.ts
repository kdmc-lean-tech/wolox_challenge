import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

fdescribe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.overrideComponent(InputFieldComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
      .createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing Methods Component', () => {

    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set value variable in Testing with writeValue method', () => {
      component.writeValue('Testing');
      expect(component.value).toBe('Testing');
    });

    it('should set value variable in Testing with setValue method', () => {
      component.setValue('Testing');
      expect(component.value).toBe('Testing');
    });

    it('should set empty string when value argument in write method is undefined', () => {
      component.writeValue(undefined);
      expect(component.value).toBe('');
    });

    it('should set disabled', () => {
      component.disabled = true;
      component.setDisabledState(component.disabled);
      expect(component.disabled).toBeTruthy();
    });
  });

  describe('Testing UI', () => {

    beforeEach(() => {
      component.ngOnInit();
    });

    it('should render label input', () => {
      component.label = 'Testing';
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('span')).nativeElement as HTMLElement;
      expect(element.innerHTML).toBe('Testing');
    });

    it('should set attr in input', () => {
      component.placeholder = 'Phone';
      component.type = 'number';
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('input')).nativeElement as HTMLElement;
      expect(element.attributes.getNamedItem('placeholder').value).toContain('Phone');
      expect(element.attributes.getNamedItem('type').value).toContain('number');
    });
  });
});
