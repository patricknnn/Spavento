import {Component} from '@angular/core';
import {routeAnimations} from './animations/route-animations2';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'Spavento Paintings';

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
