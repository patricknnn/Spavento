import { Component, OnInit } from '@angular/core';
import NewsItem from 'src/app/models/newsitem';
import { NewsService } from '../../../services/news.service';
import Shuffle from 'shufflejs';
import { ContentService } from 'src/app/services/content.service';
import PageTitle from 'src/app/models/pagetitle';
import NewsContent from 'src/app/models/newscontent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  shuffleContainer: HTMLElement;
  shuffleSizer: HTMLElement;
  shuffleInstance: Shuffle;
  pageTitle: PageTitle;
  newsContent: NewsContent;
  newsItems: NewsItem[];
  categories: string[];
  activeFilters = {
    categories: [],
  };

  constructor(
    private newsService: NewsService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.pageTitle = this.contentService.getPageTitle('news');
    this.newsContent = this.contentService.getNewsContent();
    this.categories = this.newsService.getCategories();
    this.retrieveNews();
  }

  retrieveNews(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.newsItems = data;
      this.initShuffle();
    });
  }

  initShuffle(): void {
    this.shuffleContainer = document.getElementById("shuffleContainer");
    this.shuffleSizer = document.getElementById("shuffleSizer");
    if (this.shuffleContainer && this.shuffleSizer) {
      this.shuffleInstance = new Shuffle(this.shuffleContainer, {
        itemSelector: '.shuffle-item',
        sizer: this.shuffleSizer
      });
    }
  }

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.shuffleInstance.filter();
  }

  updateFilters() {
    // Apply filter
    this.shuffleInstance.filter((element: Element) => {
      return this.itemPassesFilters(element);
    });
  }

  // Check if item passes current filters
  itemPassesFilters(element): boolean {
    var categories = this.activeFilters.categories;
    var category = element.getAttribute('data-category');
    // Categories
    if (categories.length > 0 && !categories.includes(category)) {
      return false;
    }
    return true;
  }
}
