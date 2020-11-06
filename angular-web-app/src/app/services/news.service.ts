import { Injectable } from '@angular/core';
import { NEWS } from '../../mock-news';
import { NewsItem } from '../models/newsitem';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news = NEWS;

  constructor() {}

  getAllNews(): NewsItem[] {
    return this.news;
  }
}
