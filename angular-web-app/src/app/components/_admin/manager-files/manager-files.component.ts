import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/fileupload';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-files',
  templateUrl: './manager-files.component.html',
  styleUrls: ['./manager-files.component.scss'],
})
export class ManagerFilesComponent implements OnInit {
  title = 'Bestanden';
  subTitle = 'Manager';
  text =
    'Hier is een overzicht van alle bestanden op de server te vinden. Om bestanden toe te voegen kan je gebruik maken van het upload formulier.';
  fileUploads: any[];
  selectedFiles: File[] = [];
  currentFileUpload: FileUpload;
  dataSource: any;
  displayedColumns: string[] = ['thumbnail', 'name', 'created', 'options'];
  percentage = 0;
  uploadCount = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
        this.dataSource = new MatTableDataSource(this.fileUploads);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Apply filter to the table view
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Reset the table view filter
   */
  resetFilter(): void {
    this.dataSource.filter = null;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelect(event): void {
    this.selectedFiles.push(...event.addedFiles);
  }

  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length) {
      this.selectedFiles.forEach((file) => {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorageAndReturnPercentage(this.currentFileUpload).subscribe(
          (percentage) => {
            percentage == 100
              ? this.onUploadComplete()
              : (this.percentage = Math.round(percentage ? percentage : 0));
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }
  }

  onUploadComplete(): void {
    this.uploadCount++;
    if (this.uploadCount == this.selectedFiles.length) {
      Swal.fire({
        title: 'Gelukt!',
        text: this.uploadCount + ' bestand(en) geupload.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.selectedFiles = [];
      this.uploadCount = 0;
      this.percentage = 0;
      this.currentFileUpload = null;
    }
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    Swal.fire({
      title: 'Bestand verwijderen?',
      text: 'Dit kan niet ondaan gemaakt worden.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Verwijderen',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.uploadService.deleteFile(fileUpload);
        Swal.fire({
          title: 'Gelukt!',
          text: 'Bestand verwijderd.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Geannuleerd!',
          text: 'Bestand niet verwijderd.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
