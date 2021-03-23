import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';

/**
 * Constants
 */
const duration = 500;

const positionAbsolute =
  query(':enter, :leave', [
    style({ position: 'absolute', top: 0, left: 0, width: '100%' })
  ], { optional: true });

/**
 * RouteAnimations
 */
export const routeAnimations = trigger('routeAnimations', [
  /**
   * => admin
   */
  transition('* => *', [
    positionAbsolute,
    query(':leave', [
      style({ opacity: 1 })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate(duration / 2 + 'ms ease', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate(duration / 2 + 'ms ease', style({ opacity: 1 }))
      ], { optional: true }),
    ]),
    // Animate child
    query(':enter', animateChild(), { optional: true }),
  ]),
]);
