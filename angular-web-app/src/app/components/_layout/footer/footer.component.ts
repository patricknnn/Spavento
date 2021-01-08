import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterContent } from '../../../models/footercontent';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  content: FooterContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.content = this.contentService.getFooterContent();
  }

  ngAfterViewInit(): void {
    // init footer margin
    this.siteFooter();
    // init on resize
    window.onresize = this.siteFooter;
  }

  // Add footer margin to content
  siteFooter(): void {
    const siteFooterHeight = document.getElementById('site-footer').clientHeight;
    document.getElementById('site-content').style.marginBottom = siteFooterHeight + 'px';
  }
}
