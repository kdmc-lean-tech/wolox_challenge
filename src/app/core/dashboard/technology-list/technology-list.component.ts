import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SortTechnology, Technology, TypeTechnology } from '@models/technology.model';
import { TechnologyService } from '@services/technologies/technologies.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit, OnDestroy {
  public technologies: Technology[] = [];
  public sortTechnologiesList: SortTechnology[] = [
    { label: 'Ascending', value: 'ASC' },
    { label: 'Descending', value: 'DESC' }
  ];
  public typeList = ['tech', 'author', 'license', 'language', 'type'];
  public form: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private technologyService: TechnologyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getTechnologies('', 'ASC', 'tech');
    this.listenChangesInForm();
  }

  private createForm() {
    this.form = this.fb.group({
      sort: new FormControl(''),
      search: new FormControl(''),
      type: new FormControl('')
    });
    this.form.patchValue({
      sort: { label: 'Ascending', value: 'ASC' },
      type: 'tech'
    });
  }

  public getTechnologies(search: string, sort: 'ASC' | 'DESC' = 'ASC', type: TypeTechnology) {
    this.technologyService.getTechnologies()
      .pipe(
        map((technologies) =>
        technologies.filter(t => t[type]?.toLocaleLowerCase()?.includes(search?.toLowerCase()?.trim()))
      ))
      .pipe(
        map((technologies) => {
          if (sort === 'ASC') {
            return technologies.sort((a, b) =>
              a.tech?.toLowerCase() > b.tech?.toLocaleLowerCase() ? 1 : -1);
          }
          if (sort ===  'DESC') {
            return technologies.sort((a, b) =>
              a.tech?.toLocaleLowerCase() < b.tech?.toLocaleLowerCase() ? 1 : -1);
          }
        })
      ).subscribe(technologies => this.technologies = technologies);
  }

  private listenChangesInForm() {
    this.subscriptions.add(
      this.form.valueChanges.subscribe(values =>
        this.getTechnologies(values.search, values.sort.value, values.type))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
