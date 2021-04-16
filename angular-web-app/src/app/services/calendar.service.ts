import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CalendarItem } from '../models/calendaritem';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private dbPath = '/calendaritems';
  calendarRef: AngularFirestoreCollection<CalendarItem>;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(private db: AngularFirestore) {
    this.calendarRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<CalendarItem> {
    return this.calendarRef;
  }

  public getAllActive(): AngularFirestoreCollection<CalendarItem> {
    return this.db.collection(this.dbPath, ref => ref
      .where('active', '==', true)
    );
  }

  public create(item: CalendarItem): any {
    item.timestampCreated = Date.now();
    return this.calendarRef.add({ ...item });
  }

  public update(id: string, data: any): Promise<void> {
    data.timestampUpdated = Date.now();
    return this.calendarRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.calendarRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<CalendarItem> {
    return this.calendarRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<CalendarItem> {
    return this.db.collection(this.dbPath, ref => ref
      .orderBy('timestampCreated')
      .limit(amount));
  }

  public searchByTitle(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('title', '>=', param)
      .where('title', '<=', param + '\uf8ff'));
  }

  public searchByDescription(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('description', '>=', param)
      .where('description', '<=', param + '\uf8ff'));
  }
}
