import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PAINTINGS } from 'src/mock-paintings';
import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {
  paintings = PAINTINGS;

  private dbPath = '/paintings';
  paintingsRef: AngularFireList<Painting>;

  constructor(private db: AngularFireDatabase) { 
    this.paintingsRef = db.list(this.dbPath);
  }

  public getAll(): AngularFireList<Painting> {
    return this.paintingsRef;
  }

  public create(painting: Painting): any {
    return this.paintingsRef.push(painting);
  }

  public update(key: string, value: any): Promise<void> {
    return this.paintingsRef.update(key, value);
  }

  public delete(key: string): Promise<void> {
    return this.paintingsRef.remove(key);
  }

  public deleteAll(): Promise<void> {
    return this.paintingsRef.remove();
  }






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

  public getLatest(amount: number): Painting[] {
    return this.paintings.slice(0, amount);
  }

  public getFeatured(): Painting {
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
