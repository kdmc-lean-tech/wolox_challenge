import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestTranslateService } from '@testing/services/traslate-service/test-traslate.service';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useClass: TestTranslateService }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
  }));

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set in localstorage the lang default', () => {
    /**
     * Evaluate that the default language is set.
     */
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should set in localstorage the lang', () => {
    /**
     * Sets a default value in the localStorage to check the setLanguage method.
     */
    localStorage.setItem('lang', 'es');
    expect(localStorage.getItem('lang')).toBe('es');
  });

  it('should render title', () => {
    const element = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement;
    expect(element.innerHTML).toBe('Wolox Challenge App');
  });
});
