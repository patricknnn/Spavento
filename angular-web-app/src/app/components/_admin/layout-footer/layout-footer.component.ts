import { Component, OnInit } from '@angular/core';
import { FooterContent } from 'src/app/models/footercontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  title = "Footer";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de footer op de website.";
  footerContent: FooterContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.footerContent = this.contentService.getFooterContent()[0];
  }

}
