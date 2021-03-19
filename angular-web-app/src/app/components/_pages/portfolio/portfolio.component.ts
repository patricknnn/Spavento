import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GalleryContent } from 'src/app/models/gallerycontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { PageTitle } from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  pageTitle: PageTitle;
  galleryContent: GalleryContent;
  generalContent: GeneralContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.retrievePageTitle();
    this.retrieveContent();
    this.retrieveGeneralContent();
  }

  retrievePageTitle(): void {
    this.contentService.getPageTitle('portfolio').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = data[0];
    });
  }

  retrieveContent(): void {
    this.contentService.getGalleryContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.galleryContent = data[0];
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
