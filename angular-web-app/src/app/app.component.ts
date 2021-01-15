import { Component } from '@angular/core';
import { routeAnimations } from './animations/route-animations';
import { RouterOutlet } from '@angular/router';
import { ContentService } from './services/content.service';
import { NavContent } from './models/navcontent';
import { FooterContent } from './models/footercontent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'Spavento Paintings';
  navContent: NavContent;
  footerContent: FooterContent;

  constructor(private contentService: ContentService) {
    this.navContent = this.contentService.getNavContent();
    this.footerContent = this.contentService.getFooterContent();
  }

  prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
