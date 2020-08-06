import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string;
  titleDisplay: string;
  subTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Spavento';
    this.titleDisplay = '';
    this.subTitle = 'Paintings & Artwork';
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
