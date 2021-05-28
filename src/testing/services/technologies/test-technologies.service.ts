import { Injectable } from '@angular/core';
import { Technology } from '@models/technology.model';
import { TechnologyService } from '@services/technologies/technologies.service';
import { asyncData } from '@testing/helpers/async-observable-helpers';
import { technologiesMock } from '@testing/__mocks__/technologies.mock';
import { Observable } from 'rxjs';

@Injectable()
export class TestTechnologiesService extends TechnologyService {
  constructor() {
    super(null);
  }

  public getTechnologies(): Observable<Technology[]> {
    return asyncData(technologiesMock);
  }
}
