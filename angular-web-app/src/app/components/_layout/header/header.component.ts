import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() small = false;
  @Input() title: string;
  @Input() subTitle: string;
  titleDisplay: string;

  constructor() {
  }

  ngOnInit(): void {
    // Init display title
    this.titleDisplay = '';

    // Typing effect
    this.typingCallback(this);

    // Parallax effect
    $(window).on('scroll', () => {
      const scroll = window.scrollY;
      const header = this.small ? $('header.smallhead') : $('header.masthead');
      header.css({
        transform: 'translate3d(0px, ' + (scroll / 3) + 'px' + ', 0px)'
      });
    });
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
