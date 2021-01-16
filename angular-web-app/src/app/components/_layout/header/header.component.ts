import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderContent } from 'src/app/models/headercontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() small: boolean;
  @Input() paralax: boolean;
  @Input() typing: boolean;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() image: string;
  titleDisplay: string;
  headerContent: HeaderContent;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.headerContent = this.contentService.getHeaderContent();
    // Set defaults if none provided
    this.setDefaults();
    // Init desired effects
    this.initEffects();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initEffects();
  }

  setDefaults(): void {
    if (this.small == null) {
      this.small = this.headerContent.small;
    }
    if (this.paralax == null) {
      this.paralax = this.headerContent.paralax;
    }
    if (this.typing == null) {
      this.typing = this.headerContent.typing;
    }
    if (!this.image) {
      this.image = this.headerContent.defaultImage;
    }
  }

  initEffects(): void {
    this.typing ? this.initTyping() : this.titleDisplay = this.title;
    if (this.paralax) {
      this.initParalax();
    }
  }

  initTyping(): void {
    // Init display title
    this.titleDisplay = '';
    this.typingCallback(this);
  }

  typingCallback(that): void {
    const totalLength = that.title.length;
    const currentLength = that.titleDisplay.length;
    if (currentLength < totalLength) {
      that.titleDisplay += that.title[currentLength];
      setTimeout(that.typingCallback, 75, that);
    }
  }

  initParalax(): void {
    window.onscroll = this.paralaxCallback;
  }

  paralaxCallback(): void {
    const scroll = window.scrollY;
    const header = document.getElementById('header');
    header.style.transform = 'translate3d(0px, ' + scroll / 3 + 'px, 0px)';
  }

  scrollDown(): void {
    let main = document.getElementById('home');
    main.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}
