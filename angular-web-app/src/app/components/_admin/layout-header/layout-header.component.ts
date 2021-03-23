import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { HeaderContent } from 'src/app/models/headercontent';
import { ContentService } from 'src/app/services/content.service';
import { FileService } from 'src/app/services/file.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  @ViewChild('headerForm') form: NgForm;
  generalContent: GeneralContent;
  title = "Header";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de header op de website.";
  headerContent: HeaderContent;
  headerContentHistory: HeaderContent[];
  fileUploads: any[];
  formStyle = "standard";
  formColor = "accent";

  constructor(
    private uploadService: FileService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveGeneralContent();
    this.retrieveData();
    this.retrieveFiles();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveHeaderContent(this.headerContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getHeaderContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.headerContentHistory = data;
      this.headerContent = data[0];
      if (!this.headerContent) {
        this.loadDefaults();
      }
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
      let header = document.getElementById('header');
      if (header) {
        header.classList.add(this.generalContent.cardElevation);
      }
    });
  }

  retrieveFiles(): void {
    this.uploadService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data) => {
      this.fileUploads = data;
    });
  }

  setBoolean(input, e): void {
    e.checked ? input = true : input = false;
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

  loadDefaults(): void {
    this.headerContent = new HeaderContent();
    this.headerContent.paralax = true;
    this.headerContent.small = true;
    this.headerContent.typing = true;
    this.headerContent.defaultTitle = "Spavento";
    this.headerContent.defaultSubtitle = "Paintings & Artwork";
    this.headerContent.defaultImage = "../../../../assets/img/dessertcar.jpg";
  }
}
