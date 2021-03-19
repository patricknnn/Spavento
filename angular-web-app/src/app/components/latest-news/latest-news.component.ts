import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NewsItem } from 'src/app/models/newsitem';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnChanges {
  @Input() generalContent: GeneralContent;
  @Input() amount: number = 3;
  newsItems: NewsItem[];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.newsService.getLatest(this.amount).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.newsItems = data;
      
    });
  }

}
