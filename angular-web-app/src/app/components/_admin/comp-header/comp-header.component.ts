import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { PageTitle } from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-header',
  templateUrl: './comp-header.component.html',
  styleUrls: ['./comp-header.component.scss']
})
export class CompHeaderComponent implements OnInit {
  @ViewChild('headerForm') form: NgForm;
  @Input() generalContent: GeneralContent;
  @Input() page: string;
  pageTitle: PageTitle;
  pageTitleHistory: PageTitle[];
  fileUploads: any;
  formStyle = "standard";
  formColor = "accent";
  
  constructor(
    private contentService: ContentService,
    private uploadService: FileUploadService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.retrieveFiles();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.savePageTitle(this.page, this.pageTitle).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getPageTitle(this.page).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitleHistory = data;
      this.pageTitle = data[0];
      if (!this.pageTitle) {
        this.retrieveDefaultHeader();
      }
    });
  }

  retrieveFiles(): void {
    this.uploadService.getFiles(99).snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data) => {
      this.fileUploads = data;
    });
  }

  retrieveDefaultHeader(): void {
    this.contentService.getHeaderContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = new PageTitle();
      this.pageTitle.title = data[0].defaultTitle;
      this.pageTitle.subTitle = data[0].defaultSubtitle;
    });
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrieveData();
        this.swalService.successSwal("Veranderingen teruggedraaid");
        this.form.form.markAsPristine();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
