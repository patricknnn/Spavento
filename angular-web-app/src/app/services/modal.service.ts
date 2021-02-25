import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dialogRef: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
  ) {  }

  public openModal(content, options?) {
    this.dialogRef = this.dialog.open(content, options);
  }

  public confirmModal(message) {
    this.dialogRef = this.dialog.open(message);
    return this.dialogRef;
  }

}
