import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BreakpointObserverService
} from '@services/breakpoint-observer/breakpoint-observer.service';
import { Router } from '@angular/router';
import { SessionService } from '@services/session/session.service';
import { FavoritesService } from '@services/favorites/favorites.service';
import { Favorite } from '@models/favorite.model';
import { MENU } from '@shared/constants/menu/menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public size$: Observable<string>;
  public menu;
  public isLoggedIn = false;
  public favorites: Observable<Favorite[]>;

  constructor(
    private breakPointObserverService: BreakpointObserverService,
    private router: Router,
    private sessionService: SessionService,
    private favoritesService: FavoritesService
  ) {
  }

  ngOnInit(): void {
    this.size$ = this.breakPointObserverService.sizeBreakpoint$;
    this.isLoggedIn = this.sessionService.isLoggedIn;
    this.isLoggedIn ? this.menu = MENU.admin : this.menu = MENU.user;
    this.favorites = this.favoritesService.favorites;
  }

  public navigateToResponseUrl(hiperlink: string) {
    window.location.href = hiperlink;
  }

  public goToLogin() {
    this.router.navigate(['/accounts/register']);
  }

  public logout() {
    this.sessionService.clearSession();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
