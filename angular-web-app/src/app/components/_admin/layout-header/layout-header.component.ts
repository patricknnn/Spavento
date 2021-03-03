import { Component, OnInit } from '@angular/core';
import HeaderContent from 'src/app/models/headercontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  title = "Header";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de header op de website.";
  headerContent: HeaderContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.headerContent = this.contentService.getHeaderContent();
    let header = document.getElementById('header');
    if (header) {
      header.classList.add('mat-elevation-z4');
    }
  }

  setBoolean(input, e): void {
    e.checked ? input = true : input = false;
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.headerContent = this.contentService.getHeaderContent();
  }
}
