import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GalleryContent } from 'src/app/models/gallerycontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-gallery',
  templateUrl: './comp-gallery.component.html',
  styleUrls: ['./comp-gallery.component.scss']
})
export class CompGalleryComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  @ViewChild('galleryContentForm') form: NgForm;
  galleryContent: GalleryContent;
  galleryContentHistory: GalleryContent[];

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveGalleryContent(this.galleryContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getGalleryContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.galleryContentHistory = data;
      this.galleryContent = data[0];
      if (!this.galleryContent) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.galleryContent = new GalleryContent();
    this.galleryContent.title = "My portfolio";
    this.galleryContent.subTitle = "Paintings & Artwork";
    this.galleryContent.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.galleryContent.filterCategoriesActive = true;
    this.galleryContent.filterMaterialsActive = true;
    this.galleryContent.filterPaintsActive = true;
    this.galleryContent.filterStatesActive = true;
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
