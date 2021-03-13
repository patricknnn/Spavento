import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CtaContent } from 'src/app/models/ctacontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-cta',
  templateUrl: './comp-cta.component.html',
  styleUrls: ['./comp-cta.component.scss']
})
export class CompCtaComponent implements OnInit {
  @ViewChild('ctaForm') form: NgForm;
  cta: CtaContent;
  ctaHistory: CtaContent[];
  backgrounds = [
    "../../../../assets/img/material-bg-primary.jpg",
    "../../../../assets/img/material-bg-light.jpg",
    "../../../../assets/img/material-bg.jpg",
  ];
  formStyle = "standard";
  formColor = "accent";

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveCtaContent(this.cta).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getCtaContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.ctaHistory = data;
      this.cta = data[0];
      if (!this.cta) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.cta = new CtaContent();
    this.cta.title = "Check out my latest work";
    this.cta.subTitle = "Its super awesome";
    this.cta.active = true;
    this.cta.image = this.backgrounds[1];
    this.cta.btnText = "Take me there";
    this.cta.btnLink = "/portfolio";
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
