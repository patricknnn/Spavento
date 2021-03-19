import { Component } from '@angular/core';
import { routeAnimations } from './animations/route-animations';
import { RouterOutlet } from '@angular/router';
import { ContentService } from './services/content.service';
import { NavContent } from './models/navcontent';
import { FooterContent } from './models/footercontent';
import { map } from 'rxjs/operators';

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
    this.retrieveNavContent();
    this.retrieveFooterContent();
  }

  retrieveNavContent(): void {
    this.contentService.getNavContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.navContent = data[0];
    });
  }

  retrieveFooterContent(): void {
    this.contentService.getFooterContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.footerContent = data[0];
    });
  }


  prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
