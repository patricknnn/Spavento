import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'Contact';
  subTitle = 'Lets get in touch';

  constructor() { }

  ngOnInit(): void {
  }

}
