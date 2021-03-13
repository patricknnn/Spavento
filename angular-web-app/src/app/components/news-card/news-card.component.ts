import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (this.direction == 'col') {
      this.colOne = 'col-12';
      this.colTwo = 'col-12';
      this.imageClass = 'img-news-small';
    }
  }

  openNewsItem(content): void {
    this.modalService.openModal(content);
  }
}
