import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsItem } from '../../models/newsitem';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() newsItem: NewsItem;
  @Input() direction = 'row';
  colOne = 'col-md-3';
  colTwo = 'col-md-9';
  imageClass = '';
  formattedDate: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.direction == 'col') {
      this.colOne = 'col-12';
      this.colTwo = 'col-12';
      this.imageClass = 'img-news-small';
    }
    this.formattedDate = this.getDate();
  }

  openNewsItem(content) {
    //this.beforeModalOpen();
    const dialogRef = this.dialog.open(content);
    dialogRef.afterClosed().subscribe({
      next() {
        //this.afterModalClose();
      },
    });

  }

  getDate(): string {
    let date = new Date(this.newsItem.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('nl-NL', options);
  }

  beforeModalOpen(): void {
    let app = document.getElementById('app-root');
    app.classList.add('app-root-absolute');
  }

  afterModalClose(): void {
    let app = document.getElementById('app-root');
    app.classList.remove('app-root-absolute');
  }
}
