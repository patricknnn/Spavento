import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from '../../../services/news.service';
import Shuffle from 'shufflejs';
import { ContentService } from 'src/app/services/content.service';
import { PageTitle } from 'src/app/models/pagetitle';
import { NewsContent } from 'src/app/models/newscontent';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, AfterViewInit {
  @ViewChild('shuffleContainer') private shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;
  private shuffleInstance: Shuffle;
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
  ) {}

  ngOnInit(): void {
    this.pageTitle = this.contentService.getPageTitle('news');
    this.newsContent = this.contentService.getNewsContent();
    this.newsItems = this.newsService.getAllNews();
    this.categories = this.newsService.getCategories();
  }

  ngAfterViewInit(): void {
    this.shuffleInstance = new Shuffle(this.shuffleContainer.nativeElement, {
      itemSelector: '.shuffle-item',
      sizer: this.shuffleSizer.nativeElement,
    });
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
