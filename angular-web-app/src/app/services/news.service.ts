import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NewsItem } from '../models/newsitem';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private dbPath = '/newsitems';
  newsRef: AngularFirestoreCollection<NewsItem>;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(private db: AngularFirestore) {
    this.newsRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<NewsItem> {
    return this.newsRef;
  }

  public getAllActive(): AngularFirestoreCollection<NewsItem> {
    return this.db.collection(this.dbPath, ref => ref
      .where('active', '==', true));
  }

  public create(item: NewsItem): any {
    item.timestampCreated = Date.now();
    return this.newsRef.add({ ...item });
  }

  public update(id: string, data: any): Promise<void> {
    data.timestampUpdated = Date.now();
    return this.newsRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.newsRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<NewsItem> {
    return this.newsRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<NewsItem> {
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

  getCategories(): string[] {
    return [
      "Exposities",
      "Technologie",
      "Services"
    ];
  }
}
