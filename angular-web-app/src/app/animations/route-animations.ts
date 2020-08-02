import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // home => *
  transition('home => *', [
    // query(':enter, :leave', [
    //   style({
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width: '100%'
    //   })
    // ], { optional: true }),
    group([
      // shrink header height: 50vh
      query('header.masthead', [
        animate('250ms ease', style({height: '50vh'}))
      ], { optional: true }),

      query(':leave', [
        animate('250ms ease', style({height: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('250ms ease-out', style({left: '0%'}))
      ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // * => home
  transition( '* => home', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':leave',
      [
        style({ opacity: 1 })
      ], { optional: true }
    ),
    query(':enter',
      [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 }))
      ], { optional: true }
    )
  ])

]);
