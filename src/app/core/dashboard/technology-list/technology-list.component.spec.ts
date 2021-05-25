import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { TechnologyService } from '@services/technologies/technologies.service';
import { TestTechnologiesService } from '@testing/services/technologies/test-technologies.service';

import { TechnologyListComponent } from './technology-list.component';
import { By } from '@angular/platform-browser';

describe('TechnologyListComponent', () => {
  let component: TechnologyListComponent;
  let fixture: ComponentFixture<TechnologyListComponent>;
  let technologyService: TechnologyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyListComponent ],
      providers: [
        { provide: TechnologyService, useClass: TestTechnologiesService },
        FormBuilder
      ]
    });
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

  describe('Form Validations', () => {
    let sortControl: AbstractControl;
    let searchControl: AbstractControl;

    beforeEach(() => {
      component.ngOnInit();
      sortControl = component.form.get('sort');
      searchControl = component.form.get('search');
    });

    it('should set sort control by default value', () => {
      expect(sortControl.value).toEqual({ label: 'Ascending', value: 'ASC' });
    });

    it('should call getTechnologies() method when component is created', fakeAsync(() => {
      const getTehcnologiesSpy = spyOn(component, 'getTechnologies');
      component.ngOnInit();
      tick();
      expect(getTehcnologiesSpy).toHaveBeenCalledWith('', 'ASC');
    }));

    it('should call getTehcnologies() method when change some control', fakeAsync(() => {
      const getTehcnologiesSpy = spyOn(component, 'getTechnologies');
      sortControl.setValue({ label: 'Ascending', value: 'ASC' });
      searchControl.setValue('angular');
      tick();
      expect(getTehcnologiesSpy).toHaveBeenCalledWith(searchControl.value, sortControl.value.value);
    }));
  });

  describe('Filter Validations', () => {
    let sortControl: AbstractControl;
    let searchControl: AbstractControl;

    beforeEach(() => {
      component.ngOnInit();
      sortControl = component.form.get('sort');
      searchControl = component.form.get('search');
      component.technologies = [];
    });

    it('should bring technologies when component is created', fakeAsync(() => {
      component.ngOnInit();
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies.length).toEqual(3);
    }));

    it('should bring the technologies filtered by search', fakeAsync(() => {
      searchControl.setValue('angular');
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies.length).toEqual(1);
      expect(component.technologies).toContain({
        tech: 'Angular',
        year: '2016',
        author: 'Google',
        license: 'MIT',
        language: 'TypeScript',
        type: 'Front-End',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png'
      });
    }));

    it('should bring the all technologies when search be empty string', fakeAsync(() => {
      searchControl.setValue('');
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies.length).toEqual(3);
    }));

    it('should bring technologies in ascending order', () => fakeAsync(() => {
      searchControl.setValue('');
      sortControl.setValue({ label: 'Ascending', value: 'ASC' });
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies[0].tech).toBe('Angular');
      expect(component.technologies[1].tech).toBe('React');
      expect(component.technologies[2].tech).toBe('React Native');
    }));

    it('should bring technologies in descending order', fakeAsync( () => {
      searchControl.setValue('');
      sortControl.setValue({ label: 'Descending', value: 'DESC' });
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies[0].tech).toBe('React Native');
      expect(component.technologies[1].tech).toBe('React');
      expect(component.technologies[2].tech).toBe('Angular');
    }));

    it('should bring technologies in descending order and filter with reac', fakeAsync(() => {
      searchControl.setValue('reac');
      sortControl.setValue({ label: 'Descending', value: 'DESC' });
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      expect(component.technologies.length).toEqual(2);
      expect(component.technologies[0].tech).toBe('React Native');
      expect(component.technologies[1].tech).toBe('React');
    }));
  });

  describe('UI Validations', () => {
    let sortControl: AbstractControl;
    let searchControl: AbstractControl;

    beforeEach(() => {
      component.ngOnInit();
      sortControl = component.form.get('sort');
      searchControl = component.form.get('search');
      component.technologies = [];
    });

    it('should render Ascending in select', () => {
      const element = fixture.debugElement.queryAll(By.css('#option'))[0].nativeElement as HTMLElement;
      fixture.detectChanges();
      expect(element.innerHTML).toContain('Ascending');
    });

    it('should render Descending in select', () => fakeAsync(() => {
      sortControl.setValue({ label: 'Descending', value: 'DESC' });
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      const element = fixture.debugElement.queryAll(By.css('#option'))[0].nativeElement as HTMLElement;
      fixture.detectChanges();
      expect(element.innerHTML).toContain('Descending');
    }));

    it('should render 3 tech cards', fakeAsync(() => {
      component.ngOnInit();
      spyOn(technologyService, 'getTechnologies').and.callThrough();
      tick();
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          const elements = fixture.debugElement.queryAll(By.css('.technology-list__card'));
          expect(elements.length).toEqual(3);
        });
    }));
  });
});
