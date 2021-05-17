import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BreakpointObserverService
} from '@services/breakpoint-observer/breakpoint-observer.service';
import { Router } from '@angular/router';

const MENU = {
  user: [
    {
      href: '#home',
      name: 'home',
      label: 'MENU.HOME'
    },
    {
      href: '#benefits',
      name: 'benefits',
      label: 'MENU.BENEFIT'
    }
  ]
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public size$: Observable<string>;
  public menu = MENU.user;

  constructor(
    private breakPointObserverService: BreakpointObserverService,
    private router: Router
  ) {
    this.size$ = this.breakPointObserverService.sizeBreakpoint$;
  }

  ngOnInit(): void {
  }

  public navigateToResponseUrl(hiperlink: string) {
    window.location.href = hiperlink;
  }

  public goToLogin() {
    this.router.navigate(['/accounts/login']);
  }
}
