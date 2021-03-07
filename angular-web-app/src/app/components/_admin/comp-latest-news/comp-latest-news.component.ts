import { Component, OnInit } from '@angular/core';
import { LatestNewsContent } from 'src/app/models/latestnewscontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comp-latest-news',
  templateUrl: './comp-latest-news.component.html',
  styleUrls: ['./comp-latest-news.component.scss']
})
export class CompLatestNewsComponent implements OnInit {
  latestNews: LatestNewsContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.latestNews = this.contentService.getLatestNewsContent();
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
