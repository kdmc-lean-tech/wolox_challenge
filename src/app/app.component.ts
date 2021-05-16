import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wolox-challenge';

  constructor(private translateService: TranslateService) {
    this.setLanguage();
  }

  private setLanguage() {
    if (localStorage.getItem('lang')) {
      this.translateService.setDefaultLang(localStorage.getItem('lang'));
    } else {
      localStorage.setItem('lang', 'en');
      this.translateService.setDefaultLang(localStorage.getItem('lang'));
    }
  }
}
