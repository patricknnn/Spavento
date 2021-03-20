import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ContactFormContent } from 'src/app/models/contactformcontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-contact-form',
  templateUrl: './comp-contact-form.component.html',
  styleUrls: ['./comp-contact-form.component.scss']
})
export class CompContactFormComponent implements OnInit {
  @ViewChild('contactFormForm') form: NgForm;
  @Input() generalContent: GeneralContent;
  content: ContactFormContent;
  contentHistory: ContactFormContent[];
  formStyles: string[];
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
    this.contentService.saveContactFormContent(this.content).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.formStyles = this.contentService.getFormStyles();
    this.contentService.getContactFormContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contentHistory = data;
      this.content = data[0];
      if (!this.content) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.content = new ContactFormContent();
    this.content.title = "Send us a message";
    this.content.subTitle = "Contact";
    this.content.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.content.formStyle = "fill";
    this.content.formColor = "accent";
    this.content.active = true;
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
