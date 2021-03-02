import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {

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




  public getByKey(key: string) {
    return this.paintingsRef.query.equalTo(key).limitToFirst(1).on("value", function(snapshot) {
      return snapshot;
    });
  }

  public getLatest(amount: number): Promise<DataSnapshot> {
    return this.db.database.ref(this.dbPath).orderByChild("timestampCreated").limitToFirst(amount).once("value", function(snap) {
      return snap;
    });
  }

  public getFeatured(): Painting {
    return this.paintingsRef[0];
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


}
