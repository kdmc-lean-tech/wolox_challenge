import { Component, OnInit } from '@angular/core';
import { Technology } from '@models/technology.model';
import { TechnologyService } from '@services/technologies/technologies.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {
  public technologies: Technology[] = [];

  constructor(private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  public getTechnologies() {
    this.technologyService.getTechnologies()
      .subscribe(technologies => this.technologies = technologies);
  }
}
