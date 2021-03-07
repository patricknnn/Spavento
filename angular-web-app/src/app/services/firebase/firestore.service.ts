import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseEntity } from 'src/app/models/firebaseentity';

/**
 * Generic firestore service
 */
export class FirestoreService {
    private db: AngularFirestore;
    private collectionRef: AngularFirestoreCollection<FirebaseEntity>;
    
    /**
     * Constructor
     * @param docType Firebase entity
     * @param docPath Firebase collection path
     */
    constructor(private dbPath: string) {
        this.collectionRef = this.db.collection(dbPath);
    }

    public getAll(): AngularFirestoreCollection<FirebaseEntity> {
        return this.collectionRef;
    }

    public create(data: FirebaseEntity): Promise<any> {
        data.timestampCreated = Date.now();
        return this.collectionRef.add({ ...data });
    }

    public update(id: string, data: any): Promise<void> {
        data.timestampUpdated = Date.now();
        return this.collectionRef.doc(id).update(data);
    }

    public delete(id: string): Promise<void> {
        return this.collectionRef.doc(id).delete();
    }

    public getById(id: string): AngularFirestoreDocument<FirebaseEntity> {
        return this.collectionRef.doc(id);
    }

    public getLatest(amount: number): AngularFirestoreCollection<FirebaseEntity> {
        return this.db.collection(this.dbPath, ref => ref
            .orderBy('timestampCreated')
            .limit(amount));
    }

    public searchByTitle(param: string): AngularFirestoreCollection<FirebaseEntity> {
        return this.db.collection(this.dbPath, ref => ref
            .where('title', '>=', param)
            .where('title', '<=', param + '\uf8ff'));
    }

    public searchByDescription(param: string): AngularFirestoreCollection<FirebaseEntity> {
        return this.db.collection(this.dbPath, ref => ref
            .where('description', '>=', param)
            .where('description', '<=', param + '\uf8ff'));
    }
}
