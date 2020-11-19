import { animate, keyframes, style, transition, trigger } from '@angular/animations';


export const componentAnimations = trigger('scaleInOut', [
  transition(
    'void => *',
    animate(
      '1s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      keyframes([
        style({ flex: '0 0 0%', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)', opacity: 0, offset: 0 }),
        style({ flex: '*', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)', opacity: 1, offset: 1 }),
      ])
    )
  ),
  transition(
    '* => void',
    animate(
      '1s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      keyframes([
// visibility: hidden; 
//opacity: 0; 
//transform: translate3d(391px, 0px, 0px) scale3d(0.001, 0.001, 1); 
//transition: transform 250ms ease-out 0s, opacity 250ms ease-out 0s;
        style({ flex: '*', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)', opacity: 1, offset: 0 }),
        style({ flex: '0 0 0%', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)', opacity: 0, offset: 1 }),
      ])
    )
  ),
]);
