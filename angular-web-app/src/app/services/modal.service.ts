import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  public openModal(content) {
    this.beforeModalOpen();
    this.dialogRef = this.dialog.open(content);
    this.dialogRef.afterClosed().subscribe({
      complete: this.afterModalClose
    });
  }

  private beforeModalOpen(): void {
    let appRoot = document.getElementById('app-root');
    appRoot.classList.add('app-root-absolute');
  }

  private afterModalClose(): void {
    let appRoot = document.getElementById('app-root');
    appRoot.classList.remove('app-root-absolute');
  }
}
