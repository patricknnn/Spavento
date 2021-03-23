import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(
    private db: AngularFirestore
  ) {
    this.usersRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<User> {
    return this.usersRef;
  }

  public create(item: User): Promise<any> {
    return this.usersRef.add({ ...item });
  }

  public update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<User> {
    return this.usersRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<User> {
    return this.db.collection(this.dbPath, ref => ref
      .orderBy('timestampCreated')
      .limit(amount));
  }

}
