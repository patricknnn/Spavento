import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { File } from 'src/app/models/file';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NavContent } from 'src/app/models/navcontent';
import { NavLink } from 'src/app/models/navlink';
import { ContentService } from 'src/app/services/content.service';
import { FileService } from 'src/app/services/file.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-layout-navigation',
  templateUrl: './layout-navigation.component.html',
  styleUrls: ['./layout-navigation.component.scss']
})
export class LayoutNavigationComponent implements OnInit {
  @ViewChild('navigationForm') form: NgForm;
  generalContent: GeneralContent;
  title = "Navigatie";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de navigatie op de website.";
  navContent: NavContent;
  navContentHistory: NavContent[];
  formStyle = "standard";
  formColor = "accent";
  selectedFiles: File[];

  constructor(
    private contentService: ContentService,
    private fileService: FileService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.selectedFiles = [];
    this.retrieveData();
    this.retrieveGeneralContent();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    if (this.selectedFiles.length > 0) {
      let file: File = {
        id: "",
        name: "",
        url: "",
        timestampCreated: 0,
        timestampUpdated: 0,
        file: this.selectedFiles[0],
      };
      const { downloadUrl, uploadProgress } = this.fileService.pushFileToStorageAndReturnMetadata(file);
      downloadUrl.subscribe((downloadUrl) => {
        this.navContent.brandImage = downloadUrl;
        this.contentService.saveNavContent(this.navContent).then(() => {
          this.swalService.successSwal("opgeslagen");
        });
      });
    } else {
      this.contentService.saveNavContent(this.navContent).then(() => {
        this.swalService.successSwal("opgeslagen");
      });
    }
  }

  retrieveData(): void {
    this.contentService.getNavContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.navContentHistory = data;
      this.navContent = data[0];
      if (!this.navContent) {
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
    });
  }

  loadDefaults(): void {
    this.navContent = new NavContent();
    this.navContent.brandName = "Spavento";
    this.navContent.brandImage = "../../../../assets/img/spavento-logo.png";
    this.navContent.navLinks = [
      new NavLink("Home", "/home", true),
      new NavLink("Portfolio", "/portfolio", true),
      new NavLink("News", "/news", true),
      new NavLink("Contact", "/contact", true),
    ];
  }

  setVisibility(navlink, e): void {
    e.checked ? navlink.visible = true : navlink.visible = false;
  }

  /**
   * Handles file select
   * @param event File select event
   */
  onFileSelect(event): void {
    if (this.selectedFiles.length) {
      this.swalService.errorSwal("Maximaal 1 foto toegestaan")
    } else {
      this.selectedFiles.push(...event.addedFiles);
    }
  }

  /**
   * Handles file remove
   * @param event File remove event
   */
  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrieveData();
        this.selectedFiles = [];
        this.swalService.successSwal("Veranderingen teruggedraaid");
        this.form.form.markAsPristine();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
