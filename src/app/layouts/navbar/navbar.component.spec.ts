import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { TranslateMockPipe } from '@testing/pipes/test-translate.pipe';
import {
  TestBreakPointObserverService
} from '@testing/services/breakpoint-observer-service/test-breakpoint-observer.service';
import { TestTranslateService } from '@testing/services/translate-service/test-translate.service';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        TranslateMockPipe
      ],
      providers: [
        { provide: BreakpointObserverService, useClass: TestBreakPointObserverService },
        { provide: TranslateService, useClass: TestTranslateService }
      ],
      imports: [
        TranslateModule,
        RouterTestingModule.withRoutes([])
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render svg icon logo', () => {
    const element = fixture.debugElement.query(By.css('.nav__logo-link')).nativeElement as HTMLElement;
    expect(element.innerHTML).toContain('src="assets/svg/logo_full_color.svg"');
  });

  it('should render home label', () => {
    const elements = fixture.debugElement.queryAll(By.css('a'));
    const element = elements[1].nativeElement as HTMLElement;
    expect(element.innerHTML).toContain('MENU.HOME');
  });

  it('should render benefits label', () => {
    const elements = fixture.debugElement.queryAll(By.css('a'));
    const element = elements[2].nativeElement as HTMLElement;
    expect(element.innerHTML).toContain('MENU.BENEFIT');
  });

  it('should call navigateToResponseUrl with home hiperlink', fakeAsync(() => {
    const navigateToResponseUrlSpy = spyOn(component, 'navigateToResponseUrl');
    const elements = fixture.debugElement.queryAll(By.css('a'));
    const homeElement = elements[1].nativeElement as HTMLElement;
    homeElement.click();
    tick();
    expect(navigateToResponseUrlSpy).toHaveBeenCalledWith('#home');
  }));

  it('should call navigateToResponseUrl with benefits hiperlink', fakeAsync(() => {
    const navigateToResponseUrlSpy = spyOn(component, 'navigateToResponseUrl');
    const elements = fixture.debugElement.queryAll(By.css('a'));
    const benefitsElement = elements[2].nativeElement as HTMLElement;
    benefitsElement.click();
    tick();
    expect(navigateToResponseUrlSpy).toHaveBeenCalledWith('#benefits');
  }));

  it('should redirect to login page', fakeAsync(() => {
    const routerSpy = spyOn(router, 'navigate');
    component.goToLogin();
    expect(routerSpy).toHaveBeenCalledWith(['/accounts/login']);
  }));
});
