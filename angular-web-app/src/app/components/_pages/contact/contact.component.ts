import { Component, OnInit } from '@angular/core';
import ContactFormContent from 'src/app/models/contactformcontent';
import PageTitle from 'src/app/models/pagetitle';
import ServiceContent from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  pageTitle: PageTitle;
  contactCards: ServiceContent;
  contactForm: ContactFormContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.pageTitle = this.contentService.getPageTitle('contact');
    this.contactCards = this.contentService.getContactCardsContent();
    this.contactForm = this.contentService.getContactFormContent();
  }

}
