import { Component, Input, OnInit } from '@angular/core';
import CtaContent from 'src/app/models/ctacontent';
import FeaturedContent from 'src/app/models/featuredcontent';
import LatestNewsContent from 'src/app/models/latestnewscontent';
import LatestWorkContent from 'src/app/models/latestworkcontent';
import PageTitle from 'src/app/models/pagetitle';
import ServiceContent from 'src/app/models/servicecontent';
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
  @Input() cta: CtaContent;

  constructor(
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    if (!this.pageTitle) {
      this.pageTitle = this.contentService.getPageTitle('home');
    }
    if (!this.services) {
      this.services = this.contentService.getServicesContent();
    }
    if (!this.featured) {
      this.featured = this.contentService.getFeaturedContent();
    }
    if (!this.latestNews) {
      this.latestNews = this.contentService.getLatestNewsContent();
    }
    if (!this.latestWork) {
      this.latestWork = this.contentService.getLatestWorkContent();
    }
    if (!this.cta) {
      this.cta = this.contentService.getCtaContent();
    }
  }

}
