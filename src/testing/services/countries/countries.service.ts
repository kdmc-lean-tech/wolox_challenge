import { Injectable } from '@angular/core';
import { CountriesService } from '@services/countries/countries.service';

@Injectable()
export class TestCountriesService extends CountriesService {
  constructor() {
    super();
  }
}
