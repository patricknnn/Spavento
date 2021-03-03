import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import Painting from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {

  private dbPath = '/paintings';
  paintingsRef: AngularFirestoreCollection<Painting>;

  constructor(private db: AngularFirestore) {
    this.paintingsRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<Painting> {
    return this.paintingsRef;
  }

  public create(painting: Painting): any {
    return this.paintingsRef.add({ ...painting });
  }

  public update(id: string, data: any): Promise<void> {
    return this.paintingsRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.paintingsRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<Painting> {
    return this.paintingsRef.doc(id);
  }

  public getLatest(amount: number): any {
    return this.db.collection(this.dbPath, ref => ref
      .orderBy('timestampCreated')
      .limit(amount));
  }

  public searchByTitle(param: string): any {
    return this.db.collection(this.dbPath, ref => ref
      .where('title', '>=', param)
      .where('title', '<=', param + '\uf8ff'));
  }

  public searchByDescription(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('description', '>=', param)
      .where('description', '<=', param + '\uf8ff'));
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
