import {animate, animateChild, group, query, stagger, style, transition, trigger} from '@angular/animations';

const duration = 500;

const posAbs =
  query(':enter, :leave', [
    style({position: 'absolute', top: 0, left: 0, width: '100%'})
  ]);

const fadeEnterPageSection =
  query(':enter .page-section', [
    style({opacity: 0.5}),
    animate(duration + 'ms ease',
      style({opacity: 1})
    )
  ], {optional: true});

const fadeLeavePageSection =
  query(':leave .page-section', [
    style({opacity: 1}),
    animate(duration + 'ms ease',
      style({opacity: 0.5})
    )
  ], {optional: true});

export const routeAnimations = trigger('routeAnimations', [
  /**
   * Home => *
   */
  transition('home => *', [
    // Before animate
    posAbs,
    query(':enter .small-head hr, :enter .small-head p', [
      style({opacity: 0})
    ], {optional: true}),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .masthead', [
        animate(duration + 'ms ease', style({height: '50vh'}))
      ], {optional: true}),
      query(':leave .masthead h1, :leave .masthead p', [
        style({opacity: 1}),
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .masthead hr', [
        animate(duration + 'ms ease', style({width: 0, opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .small-head', [
        style({height: '100vh', opacity: 0}),
        animate(duration + 'ms ease', style({height: '50vh', opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    query(':enter .small-head hr, :enter .small-head p', [
      style({transform: 'translateY(50px)'}),
      stagger(20, animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))),
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Home => *
   */
  transition('* => home', [
    // Before animate
    posAbs,
    query(':enter .masthead hr, :enter .masthead p', [style({opacity: 0})]),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .small-head', [
        style({height: '50vh'}),
        animate(duration + 'ms ease', style({height: '100vh'}))
      ], {optional: true}),
      query(':leave .small-head h1, :leave .small-head p, :leave .small-head hr', [
        style({opacity: 1}),
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .masthead', [
        style({height: '50vh', opacity: 0}),
        animate(duration + 'ms ease', style({height: '100vh', opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    query(':enter .masthead hr, :enter .masthead p', [
      style({transform: 'translateY(50px)'}),
      stagger(20, animate(duration + 'ms ease', style({opacity: 1, transform: 'none'})))
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Portfolio <=> Contact
   */
  transition('portfolio <=> contact', [
    // Before animate
    posAbs,
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .small-head h1', [
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .small-head p', [
        style({opacity: 1, transform: 'none'}),
        animate(duration / 2 + 'ms ease', style({transform: 'translateY(25px)', opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .small-head', [
        style({opacity: 0}),
        animate(duration + 'ms ease', style({opacity: 1}))
      ], {optional: true}),
      query(':enter .small-head h1', [
        // style({opacity: 0, transform: 'translateY(-100px)'}),
        style({opacity: 0}),
        animate(duration + 'ms ease', style({opacity: 1}))
      ], {optional: true}),
      query(':enter .small-head p', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate(duration + 'ms ease', style({transform: 'none', opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),
]);
