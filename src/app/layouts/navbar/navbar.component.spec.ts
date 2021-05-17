import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { TranslateMockPipe } from '@testing/pipes/test-trasnlate.pipe';
import {
  TestBreakPointObserverService
} from '@testing/services/breakpoint-observer-service/test-breakpoint-observer.service';
import { TestTranslateService } from '@testing/services/traslate-service/test-traslate.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

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
        TranslateModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
