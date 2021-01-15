import { Component, OnInit } from '@angular/core';
import { PageContent } from 'src/app/models/pagecontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageContent: PageContent;

  constructor(
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.pageContent = this.contentService.getPageContent('home');
  }

}
