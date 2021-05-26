import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Favorite, KEY_FAVORITES } from '@models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public favorites: BehaviorSubject<Favorite[]> = new BehaviorSubject([]);

  constructor() {
    const favorites = this.getFavorites();
    this.emitfavorites(favorites);
  }

  public emitfavorites(favorites: Favorite[]) {
    this.favorites.next(favorites);
  }

  public toogleFavorite(favorite: Favorite) {
    const favorites = this.getFavorites();
    const favoriteToFind = this.getFavoriteByName(favorite.name);
    if (!favoriteToFind) {
      localStorage.setItem(KEY_FAVORITES, JSON.stringify([...favorites, favorite]));
      this.emitfavorites([...favorites, favorite]);
    } else {
      localStorage.setItem(KEY_FAVORITES, JSON.stringify(favorites.filter(f => f.name !== favorite.name)));
      this.emitfavorites(favorites.filter(f => f.name !== favorite.name));
    }
  }

  private getFavorites(): Favorite[] {
    let favorites: Favorite[] = [];
    const favoritesInLocalStorage = JSON.parse(localStorage.getItem(KEY_FAVORITES));
    if (favoritesInLocalStorage) {
      favorites = JSON.parse(localStorage.getItem(KEY_FAVORITES));
    } else {
      localStorage.setItem(KEY_FAVORITES, JSON.stringify([]));
    }
    return favorites;
  }

  public getFavoriteByName(nameTechToSearch: string): Favorite {
    const favorites = this.getFavorites();
    return favorites.find(f => f.name === nameTechToSearch);
  }
}
