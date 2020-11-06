import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsItem } from '../../models/newsitem';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() newsItem: NewsItem;
  @Input() direction = "row";
  colOne = "col-md-4";
  colTwo = "col-md-8";
  imageClass = ""

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if(this.direction == "col") {
      this.colOne = "col-12";
      this.colTwo = "col-12";
      this.imageClass = "img-news-small";
    }
  }

  openNewsItem(content) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

}
