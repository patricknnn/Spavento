import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CtaContent } from 'src/app/models/ctacontent';
import { FeaturedContent } from 'src/app/models/featuredcontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { LatestCalendarContent } from 'src/app/models/latestcalendarcontent';
import { LatestNewsContent } from 'src/app/models/latestnewscontent';
import { LatestWorkContent } from 'src/app/models/latestworkcontent';
import { PageTitle } from 'src/app/models/pagetitle';
import { ServiceContent } from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() pageTitle: PageTitle;
  @Input() services: ServiceContent;
  @Input() featured: FeaturedContent;
  @Input() latestNews: LatestNewsContent;
  @Input() latestWork: LatestWorkContent;
  @Input() latestCalendar: LatestCalendarContent;
  @Input() cta: CtaContent;
  generalContent: GeneralContent;

  constructor(
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.retrieveGeneralContent();
    if (!this.pageTitle) {
      this.retrievePageTitle();
    }
    if (!this.services) {
      this.retrieveServices();
    }
    if (!this.featured) {
      this.retrieveFeatured();
    }
    if (!this.latestCalendar) {
      this.retrieveLatestCalendar();
    }
    if (!this.latestNews) {
      this.retrieveLatestNews();
    }
    if (!this.latestWork) {
      this.retrieveLatestWork();
    }
    if (!this.cta) {
      this.retrieveCta();
    }
  }

  retrievePageTitle(): void {
    this.contentService.getPageTitle('home').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = data[0];
    });
  }

  retrieveServices(): void {
    this.contentService.getServicesContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.services = data[0];
    });
  }

  retrieveFeatured(): void {
    this.contentService.getFeaturedContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.featured = data[0];
    });
  }

  retrieveLatestCalendar(): void {
    this.contentService.getLatestCalendarContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestCalendar = data[0];
    });
  }

  retrieveLatestNews(): void {
    this.contentService.getLatestNewsContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestNews = data[0];
    });
  }

  retrieveLatestWork(): void {
    this.contentService.getLatestWorkContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestWork = data[0];
    });
  }

  retrieveCta(): void {
    this.contentService.getCtaContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.cta = data[0];
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
