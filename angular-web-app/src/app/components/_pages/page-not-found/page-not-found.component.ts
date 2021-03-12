import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PageTitle } from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';
import { PageNotFoundContent } from 'src/app/models/pagenotfoundcontent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  @Input() pageTitle: PageTitle;
  @Input() content: PageNotFoundContent;

  constructor(
    private contentService: ContentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (!this.pageTitle) {
      this.pageTitle = this.contentService.getPageTitle('404')[0];
    }
    if (!this.content) {
      this.content = this.contentService.getPageNotFoundContent()[0];
    }
  }

  retrievePageTitle(): void {
    this.contentService.getPageTitle('404').snapshotChanges().pipe(
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
    this.contentService.getPageNotFoundContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.content = data[0];
    });
  }

  goBack(): void {
    this.location.back();
  }
}
