import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Technology } from '@models/technology.model';
import { FavoritesService } from '@services/favorites/favorites.service';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss']
})
export class TechCardComponent implements OnInit, OnChanges {
  @Input() technology: Technology;
  public isFavorite = false;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.isFavorite = this.favoritesService.getFavoriteByName(this.technology.tech) ? true : false;
  }

  public toogleFavorite() {
    this.isFavorite = !this.isFavorite;
    const { tech, logo } = this.technology;
    this.favoritesService.toogleFavorite({ name: tech, logo });
  }
}
