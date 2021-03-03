import { Component, OnInit } from '@angular/core';
import NavContent from 'src/app/models/navcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-layout-navigation',
  templateUrl: './layout-navigation.component.html',
  styleUrls: ['./layout-navigation.component.scss']
})
export class LayoutNavigationComponent implements OnInit {
  title = "Navigatie";
  subTitle = "Layout";
  text = "Stel hier alles in met betrekking tot de navigatie op de website.";
  navContent: NavContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.navContent = this.contentService.getNavContent();
  }

  onSubmit() {
    // Handle submit
  }

  reset(): void {
    this.navContent = this.contentService.getNavContent();
  }

  setVisibility(navlink, e): void {
    e.checked ? navlink.visible = true : navlink.visible = false;
  }

}
