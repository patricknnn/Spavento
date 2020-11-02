import {animate, animateChild, group, query, stagger, style, transition, trigger} from '@angular/animations';

/**
 * Constants
 */
const duration = 500;
const mastheadHeight = '100vh';
const smallheadHeight = '60vh';

const positionAbsolute =
  query(':enter, :leave', [
    style({position: 'absolute', top: 0, left: 0, width: '100%'})
  ]);

const fadeEnterPageSection =
  query(':enter .page-section', [
    style({opacity: 0}),
    animate(duration + 'ms ease',
      style({opacity: 1})
    )
  ], {optional: true});

const fadeLeavePageSection =
  query(':leave .page-section', [
    style({opacity: 1}),
    animate(duration + 'ms ease',
      style({opacity: 0})
    )
  ], {optional: true});

/**
 * RouteAnimations
 */
export const routeAnimations = trigger('routeAnimations', [
  /**
   * Home => *
   */
  transition('home => *', [
    // Before animate
    positionAbsolute,
    query(':enter .smallhead hr, :enter .smallhead p', [
      style({opacity: 0})
    ], {optional: true}),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .masthead', [
        animate(duration + 'ms ease', style({height: smallheadHeight}))
      ], {optional: true}),
      query(':leave .masthead h1, :leave .masthead p', [
        style({opacity: 1}),
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .masthead hr', [
        animate(duration + 'ms ease', style({width: 0, opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .smallhead', [
        style({height: mastheadHeight, opacity: 0}),
        animate(duration + 'ms ease', style({height: smallheadHeight, opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    query(':enter .smallhead hr, :enter .smallhead p', [
      style({transform: 'translateY(50px)'}),
      stagger(20, animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))),
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Portfolio, Contact => Home
   */
  transition('portfolio => home, contact => home, painting => home', [
    // Before animate
    positionAbsolute,
    query(':enter .masthead hr, :enter .masthead p', [style({opacity: 0})]),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .smallhead', [
        style({height: smallheadHeight}),
        animate(duration + 'ms ease', style({height: mastheadHeight, 'margin-bottom': '60px'}))
      ], {optional: true}),
      query(':leave .smallhead h1, :leave .smallhead p, :leave .smallhead hr', [
        style({opacity: 1}),
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .masthead', [
        style({height: smallheadHeight, opacity: 0}),
        animate(duration + 'ms ease', style({height: mastheadHeight, opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    query(':enter .masthead hr', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    query(':enter .masthead p', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * * => home
   */
  transition('* => home', [
    // Before animate
    positionAbsolute,
    query(':enter .masthead hr, :enter .masthead p', [style({opacity: 0})]),
    // Animate
    query(':enter .masthead hr', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    query(':enter .masthead p', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    fadeEnterPageSection,
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * Portfolio <=> Contact
   */
  transition('portfolio <=> contact', [
    // Before animate
    positionAbsolute,
    query(':enter .smallhead p, :enter .smallhead hr', [style({opacity: 0})]),
    // Animate
    group([
      // LEAVING PAGE
      query(':leave .smallhead h1', [
        animate(duration / 2 + 'ms ease', style({opacity: 0}))
      ], {optional: true}),
      query(':leave .smallhead p', [
        animate(duration / 2 + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'translateY(25px)', opacity: 0}))
      ], {optional: true}),
      // ENTERING PAGE
      query(':enter .smallhead', [
        style({opacity: 0}),
        animate(duration + 'ms ease', style({opacity: 1}))
      ], {optional: true}),
      query(':enter .smallhead h1', [
        style({opacity: 0}),
        animate(duration + 'ms ease', style({opacity: 1}))
      ], {optional: true}),
      // PAGE SECTION
      fadeLeavePageSection,
      fadeEnterPageSection
    ]),
    query(':enter .smallhead hr', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    query(':enter .smallhead p', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),

  /**
   * * => Contact, Portfolio
   */
  transition('* => portfolio, * => contact, * => painting', [
    // Before animate
    positionAbsolute,
    query(':enter .smallhead p, :enter .smallhead hr', [style({opacity: 0})]),
    // Animate
    fadeEnterPageSection,
    query(':enter .smallhead hr', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    query(':enter .smallhead p', [
      style({transform: 'translateY(50px)'}),
      animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({transform: 'none', opacity: 1}))
    ], {optional: true}),
    // Animate child
    query(':enter', animateChild(), {optional: true}),
  ]),
]);
