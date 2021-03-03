import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import PageTitle from 'src/app/models/pagetitle';
import { ContentService } from 'src/app/services/content.service';
import PageNotFoundContent from 'src/app/models/pagenotfoundcontent';

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
      this.pageTitle = this.contentService.getPageTitle('404');
    }
    if (!this.content) {
      this.content = this.contentService.getPageNotFoundContent();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
