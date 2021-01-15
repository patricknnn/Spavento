import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent implements OnInit {
  title = "Contact";
  subTitle = "Pagina";
  text = "Stel hier alles in met betrekking tot de contact pagina op de website.";

  constructor() { }

  ngOnInit(): void {
  }

}
