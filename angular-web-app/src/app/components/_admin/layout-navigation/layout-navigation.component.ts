import { Component, OnInit } from '@angular/core';
import { NavContent } from 'src/app/models/navcontent';
import { NavLink } from 'src/app/models/navlink';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';

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

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveNavContent(this.navContent).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  reset(): void {
    this.navContent = this.contentService.getNavContent()[0];
    console.log(this.contentService.getNavContent());
    if (!this.navContent) {
      this.navContent = new NavContent();
      this.navContent.brandName = "Spavento";
      this.navContent.brandImage = "../../../../assets/img/spavento-logo.png";
      this.navContent.navLinks = [
        new NavLink("Home", "/home", true),
        new NavLink("Portfolio", "/portfolio", true),
        new NavLink("News", "/news", true),
        new NavLink("Contact", "/contact", true),
      ];
    }
  }

  setVisibility(navlink, e): void {
    e.checked ? navlink.visible = true : navlink.visible = false;
  }

}
