import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  newsItems: NewsItem[];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsItems = this.newsService.getAllNews();
  }

}
