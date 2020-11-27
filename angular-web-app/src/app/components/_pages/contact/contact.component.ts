import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'Contact';
  subTitle = 'Lets get in touch';
  contactcards: Service[];

  constructor() { }

  ngOnInit(): void {
    this.contactcards = [
      new Service(
        'phone',
        'Give a call',
        '+31 6 12345678'
      ),
      new Service(
        'email',
        'Send an email',
        'info@spavento.nl'
      ),
      new Service(
        'pin_drop',
        'Pay a visit',
        'Oeverlanden 60, 9606RR Kropswolde'
      )
    ];
  }

}
