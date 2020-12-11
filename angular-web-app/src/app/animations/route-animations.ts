import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';

/**
 * Constants
 */
const duration = 500;
const mastheadHeight = '100vh';
const smallheadHeight = '60vh';

const positionAbsolute =
  query(':enter, :leave', [
    style({ position: 'absolute', top: 0, left: 0, width: '100%' })
  ], { optional: true });

const showEnterMain =
  query(':enter .main', [
    animate(duration + 'ms ease', style({ opacity: 1 }))
  ], { optional: true });

const hideLeaveMain =
  query(':leave .main', [
    style({ opacity: 0 }),
  ], { optional: true });

const hideFooter =
  query('footer', [
    style({ opacity: 0 }),
  ], { optional: true });

const hideFilter =
  query(':enter #filterRow', [
    style({ opacity: 0 }),
  ], { optional: true });

const showFilter =
  query(':enter #filterRow', [
    animate(duration + 'ms ease', style({ opacity: 1 }))
  ], { optional: true });

/**
 * RouteAnimations
 */
export const routeAnimations = trigger('routeAnimations', [

  /**
   * masthead => smallhead
   */
  transition('home => *', [
    // Before animate
    positionAbsolute,
    hideFooter,
    hideFilter,
    query(':enter .smallhead', [
      style({ height: mastheadHeight, opacity: 0 })
    ], { optional: true }),
    query(':enter .smallhead hr, :enter .smallhead p', [
      style({ opacity: 0 })
    ], { optional: true }),
    query(':enter .page-section', [
      style({ transform: 'translateY(50px)', opacity: 0 }),
    ], { optional: true }),
    // Animate
    group([
      // ENTERING PAGE
      query(':enter .smallhead', [
        animate(duration + 'ms ease', style({ opacity: 1 }))
      ], { optional: true }),
      query(':enter .smallhead', [
        animate(duration + 'ms ease', style({ height: smallheadHeight }))
      ], { optional: true }),
      // LEAVING PAGE
      query(':leave .masthead h1, :leave .masthead hr, :leave .masthead p', [
        animate(duration / 2 + 'ms ease', style({ opacity: 0 }))
      ], { optional: true }),
      query(':leave .masthead', [
        animate(duration + 'ms ease', style({ height: smallheadHeight }))
      ], { optional: true }),

      // MAIN
      hideLeaveMain,
      showEnterMain
    ]),
    group([
      query(':enter .smallhead hr, :enter .smallhead p', [
        style({ transform: 'translateY(50px)' }),
        stagger(20, animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 }))),
      ], { optional: true }),

      query(':enter .page-section', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 })),
      ], { optional: true }),
    ]),
    showFilter,
    // Animate child
    query(':enter', animateChild(), { optional: true }),
  ]),

  /**
   *  smallhead => masthead
   */
  transition('portfolio => home, news => home, contact => home, painting => home, about => home, 404 => home', [
    // Before animate
    positionAbsolute,
    hideFooter,
    hideFilter,
    query(':enter .masthead', [
      style({ height: smallheadHeight, opacity: 0 })
    ], { optional: true }),
    query(':enter .masthead hr, :enter .masthead p', [
      style({ opacity: 0 })
    ], { optional: true }),
    query(':enter .page-section', [
      style({ transform: 'translateY(50px)', opacity: 0 }),
    ], { optional: true }),
    // Animate
    group([
      // ENTERING PAGE
      query(':enter .masthead', [
        animate(duration + 'ms ease', style({ opacity: 1 }))
      ], { optional: true }),
      query(':enter .masthead', [
        animate(duration + 'ms ease', style({ height: mastheadHeight }))
      ], { optional: true }),
      // LEAVING PAGE
      query(':leave .smallhead h1, :leave .smallhead hr, :leave .smallhead p', [
        animate(duration / 2 + 'ms ease', style({ opacity: 0 }))
      ], { optional: true }),
      query(':leave .smallhead', [
        animate(duration + 'ms ease', style({ height: mastheadHeight }))
      ], { optional: true }),
      // MAIN
      hideLeaveMain,
      showEnterMain
    ]),
    group([
      query(':enter .masthead hr, :enter .masthead p', [
        style({ transform: 'translateY(50px)' }),
        stagger(20, animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 }))),
      ], { optional: true }),

      query(':enter .page-section', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 })),
      ], { optional: true }),
    ]),
    showFilter,
    // Animate child
    query(':enter', animateChild(), { optional: true }),
  ]),

  /**
  *  * <=> *
  */
  transition('* <=> *', [
    // Before animate
    positionAbsolute,
    hideFooter,
    hideFilter,
    query(':enter .smallhead, :enter .smallhead hr, :enter .smallhead p, :enter .masthead, :enter .masthead hr, :enter .masthead p', [
      style({ opacity: 0 })
    ], { optional: true }),
    query(':enter .page-section', [
      style({ transform: 'translateY(50px)', opacity: 0 }),
    ], { optional: true }),
    // Animate
    group([
      // ENTERING PAGE
      query(':enter .smallhead, :enter .masthead', [
        animate(duration + 'ms ease', style({ opacity: 1 }))
      ], { optional: true }),
      // LEAVING PAGE
      query(':leave .smallhead h1, :leave .smallhead hr, :leave .smallhead p', [
        animate(duration / 2 + 'ms ease', style({ opacity: 0 }))
      ], { optional: true }),
      query(':leave .page-section', [
        style({ transform: 'none', opacity: 1 }),
        animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(50px)', opacity: 0 })),
      ], { optional: true }),
      // MAIN
      hideLeaveMain,
      showEnterMain
    ]),
    group([
      query(':enter .smallhead hr, :enter .smallhead p, :enter .masthead hr, :enter .masthead p', [
        style({ transform: 'translateY(50px)' }),
        stagger(20, animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 }))),
      ], { optional: true }),

      query(':enter .page-section', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(duration + 'ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none', opacity: 1 })),
      ], { optional: true }),
    ]),
    showFilter,
    // Animate child
    query(':enter', animateChild(), { optional: true }),
  ]),

]);
