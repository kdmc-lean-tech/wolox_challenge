import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Technology } from '@models/technology.model';
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
  public sortTechnologiesList: string[] = ['Ascending', 'Descending'];
  public form: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private technologyService: TechnologyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getTechnologies('', 'Ascending');
    this.listenChangesInForm();
  }

  private createForm() {
    this.form = this.fb.group({
      sort: new FormControl('Ascending'),
      search: new FormControl('')
    });
  }

  public getTechnologies(search: string, sort: 'Ascending' | 'Descending' = 'Ascending') {
    this.technologyService.getTechnologies()
      .pipe(
        map((technologies) =>
        technologies.filter(t =>
          t.tech?.toLocaleLowerCase()?.includes(search?.toLowerCase())
          ||
          t.type?.toLocaleLowerCase().includes(search?.toLowerCase()))
      ))
      .pipe(
        map((technologies) => {
          if (sort === 'Ascending') {
            return technologies.sort((a, b) =>
              a.tech?.toLowerCase() > b.tech?.toLocaleLowerCase() ? 1 : -1);
          }
          if (sort ===  'Descending') {
            return technologies.sort((a, b) =>
              a.tech?.toLocaleLowerCase() < b.tech?.toLocaleLowerCase() ? 1 : -1);
          }
        })
      )
      .subscribe(technologies => this.technologies = technologies);
  }

  private listenChangesInForm() {
    this.subscriptions.add(
      this.form.valueChanges.subscribe(values => {
        console.log(values);
        this.getTechnologies(values.search, values.sort);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
