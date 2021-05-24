import { Injectable } from '@angular/core';
import { CountriesService } from '@services/countries/countries.service';
import { countriesMock, provincesMock } from '@testing/__mocks__/countries.mock';

@Injectable()
export class TestCountriesService extends CountriesService {
  constructor() {
    super();
  }

  public getCountries(): string[] {
    return countriesMock;
  }

  public getProvincesByCountry(country: string): string[] {
    return provincesMock;
  }
}
