import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dialogRef: MatDialogRef<any>;
  dialogConfig: MatDialogConfig = {
    panelClass: "",
    hasBackdrop: true,
    backdropClass: "",
    disableClose: false,
    width: "",
    height: "",
    minWidth: "",
    minHeight: "",
    maxWidth: "",
    maxHeight: "",
    closeOnNavigation: true,
  };

  constructor(
    public dialog: MatDialog
  ) { }

  public openModal(content): MatDialogRef<any> {
    this.dialogRef = this.dialog.open(content, {
      closeOnNavigation: false,
    });
    return this.dialogRef;
  }

  public confirmModal(message): MatDialogRef<any> {
    this.dialogRef = this.dialog.open(message, {
      closeOnNavigation: false,
    });
    return this.dialogRef;
  }

  public openModalFullscreen(content): MatDialogRef<any> {
    let height = "100vh";
    let width = "100vw";
    this.dialogRef = this.dialog.open(content, {
      panelClass: "mat-dialog-fullscreen",
      hasBackdrop: true,
      disableClose: false,
      width: width,
      height: height,
      maxWidth: "none",
      maxHeight: "none",
      closeOnNavigation: false,
    });
    return this.dialogRef;
  }

}
