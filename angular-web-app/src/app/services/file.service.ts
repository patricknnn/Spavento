import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { File } from '../models/file';

export interface FilesUploadMetadata {
  uploadProgress: Observable<number>;
  downloadUrl: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private dbPath = '/files';
  filesRef: AngularFirestoreCollection<File>;

  /**
   * Constructor
   * @param db Angular Firestore
   */
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.filesRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<File> {
    return this.filesRef;
  }

  public create(item: File): Promise<DocumentReference<any>> {
    item.timestampCreated = Date.now();
    return this.filesRef.add({ ...item });
  }

  public update(id: string, data: any): Promise<void> {
    data.timestampUpdated = Date.now();
    return this.filesRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.filesRef.doc(id).delete();
  }

  public getById(id: string): AngularFirestoreDocument<File> {
    return this.filesRef.doc(id);
  }

  public getLatest(amount: number): AngularFirestoreCollection<File> {
    return this.db.collection(this.dbPath, ref => ref
      .orderBy('timestampCreated')
      .limit(amount));
  }

  public searchByName(param: string) {
    return this.db.collection(this.dbPath, ref => ref
      .where('name', '==', param)
    );
  }

  /**
   * Uploads file and returns metadata
   * @param fileUpload File to be uploaded
   */
  pushFileToStorageAndReturnMetadata(fileUpload: File): FilesUploadMetadata {
    const filePath = `${this.dbPath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.timestampCreated = Date.now();
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return {
      uploadProgress: uploadTask.percentageChanges(),
      downloadUrl: this.getDownloadUrl(uploadTask, filePath),
    };
  }

  /**
   * Returns download url
   * @param uploadTask Firebase upload task
   * @param path Path
   */
  private getDownloadUrl(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(switchMap((_) => this.storage.ref(path).getDownloadURL()));
  }

  /**
   * Saves uploaded file data to firebase
   * @param fileUpload File to be saved
   */
  private saveFileData(fileUpload: File): void {
    fileUpload.file = null;
    // check if file exists
    this.searchByName(fileUpload.name).get().toPromise().then((result) => {
      if (result.empty) {
        this.create(fileUpload).then((result) => {
          fileUpload.id = result.id;
          this.update(result.id, fileUpload);
        });
      }
    })
  }
}
