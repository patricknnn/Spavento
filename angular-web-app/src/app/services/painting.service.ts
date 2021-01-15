import { Injectable } from '@angular/core';
import { PAINTINGS } from '../../mock-paintings';
import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {
  paintings = PAINTINGS;

  constructor() { }

  public getCategories(): string[] {
    return [
      "Portretten",
      "Natuur",
      "Dieren",
      "TV Series",
      "Algemeen"
    ];
  }

  public getStates(): string[] {
    return [
      "Beschikbaar",
      "Niet beschikbaar",
      "Opdrachten",
      "Eerdere werken"
    ];
  }

  public getPaints(): string[] {
    return [
      "Oil",
      "Acryl",
      "Water"
    ];
  }

  public getMaterials(): string[] {
    return [
      "Doek",
      "Hout",
    ];
  }

  public getAllPaintings(): Painting[] {
    return this.paintings;
  }

  public getLatestPaintings(amount: number): Painting[] {
    return this.paintings.slice(0, amount);
  }

  public getFeaturedPainting(): Painting {
    return this.paintings[0];
  }

  public getPaintingById(id: number): Painting {
    return this.paintings.find((x) => x.id === id);
  }

  public getImagesByPaintingId(id: number): string[] {
    return [
      '../../../assets/img/dessertcar.jpg',
      '../../../assets/img/elephant.jpg',
      '../../../assets/img/hooglander.jpg',
      '../../../assets/img/polly.jpg',
      '../../../assets/img/tommy.jpg',
      '../../../assets/img/tommyhorse.jpg',
    ];
  }
}
