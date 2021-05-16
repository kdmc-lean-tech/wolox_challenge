import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TestTranslateService extends TranslateService {
  constructor() {
    super(null, null, null, null, null, null, null, null, null);
  }

  public setDefaultLang(lang: string) {
  }
}
