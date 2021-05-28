import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateMockPipe } from '@testing/pipes/test-translate.pipe';

import { BenefitsComponent } from './benefits.component';

describe('BenefitsComponent', () => {
  let component: BenefitsComponent;
  let fixture: ComponentFixture<BenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BenefitsComponent,
        TranslateMockPipe
      ],
      imports: [
        TranslateModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
