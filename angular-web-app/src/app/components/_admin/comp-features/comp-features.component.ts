import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FeaturedContent } from 'src/app/models/featuredcontent';
import { Painting } from 'src/app/models/painting';
import { ContentService } from 'src/app/services/content.service';
import { PaintingService } from 'src/app/services/painting.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-features',
  templateUrl: './comp-features.component.html',
  styleUrls: ['./comp-features.component.scss']
})
export class CompFeaturesComponent implements OnInit {
  @ViewChild('featuredForm') form: NgForm;
  featured: FeaturedContent;
  featuredHistory: FeaturedContent[];
  paintings: Painting[];
  formStyle = "standard";
  formColor = "accent";
  
  constructor(
    private contentService: ContentService,
    private paintingService: PaintingService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrievePaintings();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveFeaturedContent(this.featured).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getFeaturedContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.featuredHistory = data;
      this.featured = data[0];
      if (!this.featured) {
        this.loadDefaults();
      }
    });
  }

  retrievePaintings(): void {
    this.paintingService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
      this.retrieveData();
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.featured = new FeaturedContent();
    this.featured.title = "Featured";
    this.featured.subTitle = "My personal favorite";
    this.featured.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.featured.active = true;
    this.featured.painting = this.paintings[0];
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrievePaintings();
        this.swalService.successSwal("Veranderingen teruggedraaid");
        this.form.form.markAsPristine();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
