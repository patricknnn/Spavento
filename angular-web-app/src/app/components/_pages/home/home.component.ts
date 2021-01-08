import { Component, OnInit } from '@angular/core';
import { Painting } from '../../../models/painting';
import { PaintingService } from '../../../services/painting.service';
import { PageContent } from 'src/app/models/pagecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageContent: PageContent;
  featuredPainting: Painting;

  constructor(
    private paintingService: PaintingService,
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.pageContent = this.contentService.getPageContent('home');
    this.featuredPainting = this.paintingService.getLatestPaintings(1)[0];
  }

}
