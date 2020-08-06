import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

const duration = '1s';

export const routeAnimations = trigger('routeAnimations', [
  /**
   * Home => *
   */
  transition('home => *', [
    // Before animate
    query(':enter, :leave', [style({position: 'absolute', top: 0, left: 0, width: '100%'})], {optional: true}),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .masthead', [
        animate(duration + ' ease', style({height: '50vh'}))
      ], {optional: true}),
      query(':leave .masthead-txt', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .page-section', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .small-head', [
        style({height: '100vh', opacity: 0}),
        animate(duration + ' ease', style({height: '50vh', opacity: 1}))
      ], {optional: true}),
      query(':enter .page-section', [
        style({opacity: 0}),
        animate(duration + ' ease', style({opacity: 1}))
      ], {optional: true}),
    ]),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Home => *
   */
  transition('* => home', [
    // Before animate
    query(':enter, :leave', [style({position: 'absolute', top: 0, left: 0, width: '100%'})], {optional: true}),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .small-head', [
        style({height: '50vh'}),
        animate(duration + ' ease', style({height: '100vh'}))
      ], {optional: true}),
      query(':leave .page-section', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .masthead', [
        style({height: '50vh', opacity: 0}),
        animate(duration + ' ease', style({height: '100vh', opacity: 1}))
      ], {optional: true}),
      query(':enter .masthead-txt', [
        style({opacity: 0}),
        animate(duration + ' ease', style({opacity: 1}))
      ], {optional: true}),
      query(':enter .page-section', [
        style({opacity: 0}),
        animate(duration + ' ease', style({opacity: 1}))
      ], {optional: true}),
    ]),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Portfolio <=> Contact
   */
  transition('portfolio <=> contact', [
    // Before animate
    query(':enter, :leave', [style({position: 'absolute', top: 0, left: 0, width: '100%'})], {optional: true}),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .small-head h1', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .small-head p', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .page-section', [
        style({opacity: 1}),
        animate(duration + ' ease', style({opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .small-head h1', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        animate(duration + ' ease', style({opacity: 1, transform: 'none'}))
      ], {optional: true}),
      query(':enter .small-head p', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate(duration + ' ease', style({opacity: 1, transform: 'none'}))
      ], {optional: true}),
      query(':enter .page-section', [
        style({opacity: 0}),
        animate(duration + ' ease', style({opacity: 1}))
      ], {optional: true}),
    ]),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),
]);
