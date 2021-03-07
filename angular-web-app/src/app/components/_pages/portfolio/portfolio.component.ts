import { Component, OnInit } from '@angular/core';
import { GalleryContent } from 'src/app/models/gallerycontent';
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

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.pageTitle = this.contentService.getPageTitle('portfolio');
    this.galleryContent = this.contentService.getGalleryContent();
  }
}
