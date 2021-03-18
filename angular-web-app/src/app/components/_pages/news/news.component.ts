import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from '../../../services/news.service';
import { ContentService } from 'src/app/services/content.service';
import { PageTitle } from 'src/app/models/pagetitle';
import { NewsContent } from 'src/app/models/newscontent';
import { map } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations/fade-animation';

@Component({
  selector: 'app-news',
  animations: [ fadeAnimation ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  pageTitle: PageTitle;
  newsContent: NewsContent;
  newsItems: NewsItem[];
  filteredNewsItems: NewsItem[];
  categories: string[];
  activeFilters = {
    categories: [],
  };

  constructor(
    private newsService: NewsService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.retrievePageTitle();
    this.retrieveNews();
    this.retrieveNewsContent();
    this.categories = this.newsService.getCategories();
  }

  retrieveNews(): void {
    this.newsService.getAllActive().snapshotChanges().pipe(
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

  retrievePageTitle(): void {
    this.contentService.getPageTitle('news').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pageTitle = data[0];
    });
  }

  retrieveNewsContent(): void {
    this.contentService.getNewsContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.newsContent = data[0];
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
