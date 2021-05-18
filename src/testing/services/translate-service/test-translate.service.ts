import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { asyncData } from '@testing/helpers/async-observable-helpers';

@Injectable()
export class TestTranslateService extends TranslateService {
  constructor() {
    super(null, null, null, null, null, null, null, null, null);
  }

  public setDefaultLang(lang: string) {
  }

  public get(key: any): any {
    return asyncData(key);
  }
}
