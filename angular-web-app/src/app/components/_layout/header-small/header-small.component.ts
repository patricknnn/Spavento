import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-small',
  templateUrl: './header-small.component.html',
  styleUrls: ['./header-small.component.scss']
})
export class HeaderSmallComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  titleDisplay: string;

  constructor() {
  }

  ngOnInit(): void {
    this.titleDisplay = '';
    this.typingCallback(this);
  }

  typingCallback(that): void {
    const totalLength = that.title.length;
    const currentLength = that.titleDisplay.length;
    if (currentLength < totalLength) {
      that.titleDisplay += that.title[currentLength];
      setTimeout(that.typingCallback, 100, that);
    }
  }
}
