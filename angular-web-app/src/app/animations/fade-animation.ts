import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0)', 'transform-origin': '50% 100%', opacity: 0, height: 0 }),
    animate('150ms', style({ transform: 'scale(1)', 'transform-origin': '50% 100%', opacity: 1, height: '*' })),
  ]),
  transition(':leave', [
    animate('150ms', style({ transform: 'scale(0)', 'transform-origin': '50% 100%', opacity: 0, height: 0 })),
  ])
]);