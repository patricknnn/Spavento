import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() small = false;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() image: string;
  titleDisplay: string;

  constructor() {
  }

  ngOnInit(): void {
    // Init display title
    this.titleDisplay = '';
    if (!this.image) {
      this.image = "../../../../assets/img/dessertcar.jpg";
    }

    // Typing effect
    this.typingCallback(this);

    // Parallax effect on scroll
    window.onscroll = paralax;

    function paralax(): void {
      const scroll = window.scrollY;
      const header = document.getElementById("header");
      header.style.transform = "translate3d(0px, " + (scroll / 3) + "px, 0px)";
    }
  }

  scrollDown(): void {
    let main = document.getElementById("home");
    main.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  typingCallback(that): void {
    const totalLength = that.title.length;
    const currentLength = that.titleDisplay.length;
    if (currentLength < totalLength) {
      that.titleDisplay += that.title[currentLength];
      setTimeout(that.typingCallback, 75, that);
    }
  }
}
