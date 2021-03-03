import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import FooterContent from 'src/app/models/footercontent';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnChanges {
  @Input() footerContent: FooterContent;
  @Input() fixed: boolean = true;
  @Input() elevated: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // footer on resize
    window.onresize = this.siteFooter;

    // init footer
    setTimeout(() => {
      this.siteFooter();
    }, 1500);
  }

  // Add footer margin to content
  siteFooter(): void {
    let footer = document.getElementById('site-footer');
    let main = document.getElementById('site-content');
    if (footer && main) {
      main.style.marginBottom = footer.clientHeight + 'px';
    }
  }
}
