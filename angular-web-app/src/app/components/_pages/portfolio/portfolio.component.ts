import {Component, OnInit} from '@angular/core';
import { PageContent } from 'src/app/models/pagecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  pageContent: PageContent;

  constructor(private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.pageContent = this.contentService.getPageContent('portfolio');
  }
}
