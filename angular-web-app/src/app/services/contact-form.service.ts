import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/contactform';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private dbPath = '/contactforms';
  contactFormRef: AngularFirestoreCollection<ContactForm>;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(private db: AngularFirestore) {
    this.contactFormRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<ContactForm> {
    return this.contactFormRef;
  }

  public create(item: ContactForm): any {
    item.timestampCreated = Date.now();
    item.read = false;
    return this.contactFormRef.add({ ...item });
  }

  public update(id: string, item: ContactForm): Promise<void> {
    item.timestampUpdated = Date.now();
    return this.contactFormRef.doc(id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.contactFormRef.doc(id).delete();
  }
  
  public getById(id: string): AngularFirestoreDocument<ContactForm> {
    return this.contactFormRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<ContactForm> {
    return this.db.collection(this.dbPath, ref => ref
      .orderBy('timestampCreated')
      .limit(amount));
  }

  public searchByName(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('name', '>=', param)
      .where('name', '<=', param + '\uf8ff'));
  }

  public searchByEmail(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('email', '>=', param)
      .where('email', '<=', param + '\uf8ff'));
  }

  public searchBySubject(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('subject', '>=', param)
      .where('subject', '<=', param + '\uf8ff'));
  }

  getCategories(): string[] {
    return [
      "Vraag",
      "Offerte",
      "Anders"
    ];
  }
}
