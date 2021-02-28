import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { FileUpload } from '../models/fileupload';

export interface FilesUploadMetadata {
  uploadProgress: Observable<number>;
  downloadUrl: Observable<string>;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  pushFileToStorageAndReturnPercentage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.added = Date.now();
            fileUpload.name = fileUpload.file.name;
            fileUpload.edited = fileUpload.file.lastModified;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }




  pushFileToStorageAndReturnMetadata(fileUpload: FileUpload): FilesUploadMetadata {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
    .snapshotChanges()
    .pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL) => {
          fileUpload.url = downloadURL;
          fileUpload.added = Date.now();
          fileUpload.name = fileUpload.file.name;
          fileUpload.edited = fileUpload.file.lastModified;
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

  private getDownloadUrl(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(switchMap((_) => this.storage.ref(path).getDownloadURL()));
  }





  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
