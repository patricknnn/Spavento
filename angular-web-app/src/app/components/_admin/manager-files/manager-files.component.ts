import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { File } from 'src/app/models/file';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { FileService } from 'src/app/services/file.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-files',
  templateUrl: './manager-files.component.html',
  styleUrls: ['./manager-files.component.scss'],
})
export class ManagerFilesComponent implements AfterViewInit {
  generalContent: GeneralContent;
  title = 'Bestanden';
  subTitle = 'Beheer';
  text =
    'Hier is een overzicht van alle bestanden op de server te vinden. Om bestanden toe te voegen kan je gebruik maken van het upload formulier.';
  fileUploads: any[];
  selectedFiles: File[] = [];
  currentFileUpload: File;
  displayedColumns: string[] = ['thumbnail', 'name', 'created', 'options'];
  percentage = 0;
  uploadCount = 0;
  formStyle = "standard";
  formColor = "accent";
  resultsLength = 0;
  isLoadingResults = true;
  dataSource: MatTableDataSource<File>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private uploadService: FileService,
    private contentService: ContentService,
    private swalService: SwalService
  ) {
    this.generalContent = new GeneralContent();
    this.generalContent.cardElevation = "mat-elevation-z8";
    this.generalContent.formStyle = "standard";
    this.generalContent.formColor = "accent";
  }

  ngAfterViewInit() {
    this.retrieveFiles();
    this.retrieveGeneralContent();
  }

  retrieveFiles(): void {
    this.uploadService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      )
      .subscribe((data) => {
        this.fileUploads = data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        this.initTable(data);
      });
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

  initTable(data): void {
    this.dataSource = new MatTableDataSource<File>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.selectedFiles.forEach((sFile) => {
        let file: File = {
          id: "",
          name: "",
          url: "",
          timestampCreated: 0,
          timestampUpdated: 0,
          file: sFile,
        };
        this.currentFileUpload = file;
        const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(file);
        uploadProgress.subscribe(
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
      this.swalService.successSwal(this.uploadCount + " bestand(en) toegevoegd");
      this.selectedFiles = [];
      this.uploadCount = 0;
      this.percentage = 0;
      this.currentFileUpload = null;
    }
  }

  deleteFileUpload(fileUpload: File): void {
    this.swalService.promptSwal("Dit kan niet worden terug gedraaid").then((result) => {
      if (result.value) {
        this.uploadService.delete(fileUpload.id);
        this.swalService.successSwal("Bestand verwijderd");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Bestand niet verwijderd");
      }
    });
  }
}
