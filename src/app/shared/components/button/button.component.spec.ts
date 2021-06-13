import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ButtonComponent } from '@shared/components/button/button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonComponent
      ]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set inputs with default values', () => {
    expect(component.color).toBe('blue');
    expect(component.disabled).toBe(false);
    expect(component.size).toBe('xs');
  });

  it('should call eventClick method when the user clicks in button', () => {
    const spyEventClick = spyOn(component, 'eventClick');
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    button.click();
    expect(spyEventClick).toHaveBeenCalled();
  });

  it('should emit with the submitted output', fakeAsync(() => {
    component.eventClick();
    tick();
    component.submitted.subscribe(result => expect(result).toBe(true));
  }));
});
