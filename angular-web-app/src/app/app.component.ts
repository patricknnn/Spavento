import { Component, ViewChild } from '@angular/core';
import { routeAnimations } from './animations/route-animations';
import { RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'Spavento Paintings';

  prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
