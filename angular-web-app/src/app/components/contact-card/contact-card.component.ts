import { Component, OnInit } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { ContactForm } from '../../models/contactform';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  submitted = false;
  appearance = "standard";
  model = new ContactForm();
  subjects = ['Question', 'Other'];

  constructor(
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
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
