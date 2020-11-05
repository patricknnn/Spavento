import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() category: string;
  @Input() title: string;
  @Input() author: string;
  @Input() text: string;
  @Input() date: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title = "Spavento's upcoming expositions this month";
    this.category = "Expositions";
    this.author = "Spavento admin";
    this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis neque id ex volutpat, quis tempus purus finibus. Quisque et vulputate nisi. In semper maximus arcu a auctor. Nullam mi ex, fermentum nec tellus vitae, tincidunt malesuada libero.";
    this.date = "2 days ago";
  }

  openNewsItem(content) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

}
