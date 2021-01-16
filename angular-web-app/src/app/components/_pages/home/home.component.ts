import { Component, OnInit } from '@angular/core';
import { CtaContent } from 'src/app/models/ctacontent';
import { FeaturedContent } from 'src/app/models/featuredcontent';
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
  pageTitle: PageTitle;
  services: ServiceContent;
  featured: FeaturedContent;
  latestNews: LatestNewsContent;
  latestWork: LatestWorkContent;
  cta: CtaContent;

  constructor(
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.pageTitle = this.contentService.getPageTitle('home');
    this.services = this.contentService.getServicesContent();
    this.featured = this.contentService.getFeaturedContent();
    this.latestNews = this.contentService.getLatestNewsContent();
    this.latestWork = this.contentService.getLatestWorkContent();
    this.cta = this.contentService.getCtaContent();
  }

}
