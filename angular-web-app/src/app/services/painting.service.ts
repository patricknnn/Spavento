import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {
  private dbPath = '/portfolioitems';
  paintingsRef: AngularFirestoreCollection<Painting>;
  activeFilters: any;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(private db: AngularFirestore) {
    this.paintingsRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<Painting> {
    return this.paintingsRef;
  }

  public getAllActive(): AngularFirestoreCollection<Painting> {
    return this.db.collection(this.dbPath, ref => ref
      .where('active', '==', true)
    );
  }
  
  public create(painting: Painting): any {
    painting.timestampCreated = Date.now();
    return this.paintingsRef.add({ ...painting });
  }

  public update(id: string, data: any): Promise<void> {
    data.timestampUpdated = Date.now();
    return this.paintingsRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.paintingsRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<Painting> {
    return this.paintingsRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<Painting> {
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

  public setActiveFilters(filters: any): void {
    this.activeFilters = filters;
  }

  public getActiveFilters(): any {
    return this.activeFilters;
  }

}
