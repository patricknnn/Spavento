import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContactFormContent } from 'src/app/models/contactformcontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { PageTitle } from 'src/app/models/pagetitle';
import { ServiceContent } from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  generalContent: GeneralContent;
  pageTitle: PageTitle;
  contactCards: ServiceContent;
  contactForm: ContactFormContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.retrieveGeneralContent();
    this.retrievePageTitle();
    this.retrieveCards();
    this.retrieveForm();
  }

  retrievePageTitle(): void {
    this.contentService.getPageTitle('contact').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = data[0];
    });
  }

  retrieveCards(): void {
    this.contentService.getContactCardsContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contactCards = data[0];
    });
  }

  retrieveForm(): void {
    this.contentService.getContactFormContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contactForm = data[0];
    });
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

}
