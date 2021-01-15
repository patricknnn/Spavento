import { animate, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* => *', [
      query(':enter .container', [
        style({ opacity: 0 }),
        animate('0.25s', style({ opacity: 1 }))
      ], { optional: true })
    ])

  ]);