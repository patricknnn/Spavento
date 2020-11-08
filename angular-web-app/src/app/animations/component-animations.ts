import { animate, keyframes, style, transition, trigger } from '@angular/animations';


export const componentAnimations = trigger('scaleInOut', [
  transition(
    'void => *',
    animate(
      '1s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      keyframes([
        style({ transform: 'scale(0)', opacity: 1, offset: 0.5 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
      ])
    )
  ),
  transition(
    '* => void',
    animate(
      '1s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      keyframes([
        style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
        style({ transform: 'scale(0)', opacity: 1, offset: 0.5 }),
      ])
    )
  ),
]);
