import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  title = 'News';
  subTitle = 'Stay up to date';
  newsItems: NewsItem[];

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.newsItems = this.newsService.getAllNews();
  }

}
