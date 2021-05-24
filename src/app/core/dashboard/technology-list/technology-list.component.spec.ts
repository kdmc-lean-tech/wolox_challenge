import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyService } from '@services/technologies/technologies.service';
import { TestTechnologiesService } from '@testing/services/technologies/test-technologies.service';

import { TechnologyListComponent } from './technology-list.component';

describe('TechnologyListComponent', () => {
  let component: TechnologyListComponent;
  let fixture: ComponentFixture<TechnologyListComponent>;
  let technologyService: TechnologyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyListComponent ],
      providers: [
        { provide: TechnologyService, useClass: TestTechnologiesService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    technologyService = TestBed.inject(TechnologyService);
    fixture = TestBed.createComponent(TechnologyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
