import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from '../../../services/news.service';
import { ContentService } from 'src/app/services/content.service';
import { PageTitle } from 'src/app/models/pagetitle';
import { NewsContent } from 'src/app/models/newscontent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  pageTitle: PageTitle;
  newsContent: NewsContent;
  newsItems: NewsItem[];
  filteredNewsItems: NewsItem[];
  filterApplied: boolean;
  categories: string[];
  activeFilters = {
    categories: [],
  };

  constructor(
    private newsService: NewsService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrieveNews();
    this.pageTitle = this.contentService.getPageTitle('news');
    this.newsContent = this.contentService.getNewsContent();
    this.categories = this.newsService.getCategories();
    this.filterApplied = true;
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
      this.resetFilters();
    });
  }

  // Apply filter
  applyFilters() {
    this.filteredNewsItems = this.newsItems.filter((item: NewsItem) => {
      let result = this.itemPassesFilters(item);
      return result;
    });
  }

  // Check if item passes current filters
  itemPassesFilters(item: NewsItem): boolean {
    var categories = this.activeFilters.categories;
    // Categories
    if (categories.length > 0 && !categories.includes(item.category)) {
      return false;
    }
    return true;
  }

  // Clear filters and reset
  resetFilters(): void {
    this.activeFilters.categories = [];
    this.filteredNewsItems = this.newsItems;
  }
}
