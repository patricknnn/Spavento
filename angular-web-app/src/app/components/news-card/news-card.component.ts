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
  @Input() elevation: string;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openNewsItem(content): void {
    this.modalService.openModal(content);
  }
}
