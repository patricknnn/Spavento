import { Component, OnInit } from '@angular/core';
import ContactForm from '../../models/contactform';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.submitted = true; 
  }

  resetForm() {
    this.model = new ContactForm();
  }

}
