import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // home => *
  transition('home => *', [
    // before animate
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional: true}),
    // animate
    group([
      // leave
      query(':leave, header.masthead', [
        animate('1000ms ease', style({height: '50vh'}))
      ], {optional: true}),
      query(':leave, .masthead-txt', [
        style({opacity: 1}),
        animate('500ms ease', style({opacity: 0}))
      ], {optional: true}),
      // enter
      query(':enter, header.small-head', [
        style({height: '100vh', opacity: 0}),
        animate('1000ms ease', style({height: '50vh', opacity: 1}))
      ], {optional: true}),
    ]),
    query(':enter', animateChild(), {optional: true}),
  ]),

  // Fade
  transition('* => home', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional: true}),
    query(':leave',
      [
        style({opacity: 1})
      ], {optional: true}),
    query(':enter',
      [
        style({opacity: 0}),
        animate('250ms ease-in', style({opacity: 1}))
      ], {optional: true}
    )
  ])

]);
