import { Injectable } from '@angular/core';
import { countries } from '@shared/utils/countries/countries.utils';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public getCountries(): string[] {
    return countries.map(c => c.country);
  }

  public getProvincesByCountry(country: string): string[] {
    return countries.filter(c => c.country === country).map(c => c.provinces)[0];
  }
}
