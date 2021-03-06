import { Component, Input, OnInit } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { ContactForm } from '../../models/contactform';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { GeneralContent } from 'src/app/models/generalcontent';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  submitted = false;
  model = new ContactForm();

  constructor(
    private swalService: SwalService,
    private contactformService: ContactFormService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.saveMessage();
  }

  saveMessage(): void {
    this.swalService.loadingSwal("Bericht verzenden");
    this.contactformService.create(this.model).then(() => {
      this.submitted = true;
      this.model = new ContactForm();
      this.swalService.successSwal("Bericht verzonden");
    });
  }

  resetForm() {
    this.swalService.promptSwal("Alle ingevoerde data zal worden verwijderd").then((result) => {
      if (result.value) {
        this.model = new ContactForm();
        this.swalService.successSwal("Formulier leeg gemaakt");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Formulier niet leeg gemaakt");
      }
    });
  }

}
